import { PrismaClient } from '@prisma/client';
import express, {
  Request, Response,
} from 'express';
import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import { signToken, decodeBasicHeader, verifySignature } from './jwt';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

interface User {
  name: string;
  email: string;
  password: string;
}

interface Game {
  title: string;
  progress: string;
}

app.use(express.json());

passport.use(new BasicStrategy(
  async (email, password, done) => {
    try {
      await prisma.user.findUnique({
        where: {
          email,
        },
      }).then(user => {
        if (user == null) {
          return done(null, false);
        }
        if (user.password !== password) {
          return done(null, false);
        } return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  },
));

app.get('/users', (req: Request, res: Response) => {
  prisma.user.findMany().then(
    users => { console.log(users); res.status(200); res.send(users); },
    err => { console.log(err); res.status(500); },
  );
});

app.post('/users', (req: Request, res: Response) => {
  const { name, email, password } = req.body as User;
  prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  }).then(newUser => { console.log(newUser); res.status(200); res.send(newUser); },
    err => { console.log(err); res.status(500); });
});

app.get('/token', passport.authenticate('basic', { session: false }), (req: Request, res: Response) => {
  try {
    const email = decodeBasicHeader(req.get('Authorization') as string);
    if (!email) {
      throw new Error('Unexpected error: Missing Email');
    }
    const webToken = signToken(email);
    res.send(webToken); res.status(200);
  } catch {
    res.send(500);
  }
});

app.get('/users/:id', passport.authenticate('basic', { session: false }), (req: Request, res: Response) => {
  prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
  }).then(
    foundUser => { res.json(foundUser); res.status(200); },
    err => { console.log(err); res.status(500); },
  );
});

app.get('/users/:id/games', (req: Request, res: Response) => {
  try {
    const header = req.header('Authorization');
    if (header) {
      const token = header.split(' ')[1];
      if (verifySignature(token)) {
        prisma.game.findMany({
          where: {
            authorId: parseInt(req.params.id, 10),
          },
        }).then(
          foundUser => { res.json(foundUser); res.status(200); },
          err => { console.log(err); res.status(500); },
        );
      }
    }
  } catch {
    res.send(500);
  }
});

app.post('/users/:id/games', (req: Request, res: Response) => {
  try {
    const header = req.header('Authorization');
    if (header) {
      const token = header.split(' ')[1];
      if (verifySignature(token)) {
        const { title, progress } = req.body as Game;
        prisma.game.create({
          data: {
            title,
            progress,
            author: { connect: { id: parseInt(req.params.id, 10) } },
          },
        }).then(
          gameProgress => { res.json(gameProgress); res.status(200); },
          err => { console.log(err); res.status(500); },
        );
      } throw new Error('an error occured');
    }
  } catch {
    res.send(500);
  }
});

app.put('/users/:userid/games/:gameid', (req: Request, res: Response) => {
  try {
    const header = req.header('Authorization');
    if (header) {
      const token = header.split(' ')[1];
      if (verifySignature(token)) {
        const { title, progress } = req.body as Game;
        prisma.game.update({
          where: { id: parseInt(req.params.gameid, 10) },
          data: {
            title,
            progress,
          },
        }).then(
          gameProgress => { res.json(gameProgress); res.status(200); },
          err => { console.log(err); res.status(500); },
        );
      }
    }
  } catch {
    res.send(500);
  }
});

app.delete('/users/:userid/games/:gameid', (req: Request, res: Response) => {
  try {
    const header = req.header('Authorization');
    if (header) {
      const token = header.split(' ')[1];
      if (verifySignature(token)) {
        prisma.game.delete({
          where: { id: parseInt(req.params.id, 10) },
          select: {
            id: true,
            title: true,
          },
        }).then(
          gameProgress => { res.json(gameProgress); res.status(200); },
          err => { console.log(err); res.status(500); },
        );
      }
    }
  } catch {
    res.send(500);
  }
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
