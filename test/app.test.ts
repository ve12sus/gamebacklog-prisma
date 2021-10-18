import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

describe('Gamebacklog', function() {
  describe('GET /users', function() {
    it('should get users then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .get('/users')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('GET /users/:id', function() {
    it('should get an user then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .get('/users/6079b55168d9ed021a15f350')
        .auth('bar4', 'bar5')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('PUT /users/:id', function() {
    it('should update user then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .put('/users/6085be7544c13d02e8843f76')
        .auth('bar4', 'bar5')
        .send({"email":"jeff","password":"hunter5"})
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('POST /users/', function() {
    it('should create user then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .post('/users')
        .send({"email":"jeff1","password":"hunter6"})
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('DELETE /users/:id', function() {
    it('should delete the user(notfound) then respond with status 500', function() {
      chai.request('http://localhost:3000')
        .delete('/users/wronguser')
        .auth('bar4', 'bar5')
        .send({"email":"jeff1","password":"hunter6"})
        .then(function (res) {
          expect(res).to.have.status(500);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('POST /users/:id/games/', function() {
    it('should create user backlog then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .post('/users/60956b72357d7d0272892beb/games')
        .auth('bar4', 'bar5')
        .send({"name":"bloodborne","progress":"first boss"})
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('DELETE /users/:id/games/:id', function() {
    it('should create user backlog then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .delete('/users/60956b72357d7d0272892beb/games/60956faa357d7d0272892bf0')
        .auth('bar4', 'bar5')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
});
