import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9. \
  eyJzdWIiOiJmb29AYmFyIiwiZXhwIjoxNjM0NzE2MjIwLCJpYXQiOjE2MzQ3MTI1OTB9. \
  1yAmslzUoNOQlv02aNp24GskWIrOeJQznnBQrji7AbE'

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
  describe('POST /users/', function() {
    it('should create user then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .post('/users')
        .send({"name":"foo","email":"foo@bar","password":"bar"})
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
        .get('/users/2')
        .auth('foo@bar', 'bar')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('GET /token', function() {
    it('should obtain a JWT token', function() {
      chai.request('http://localhost:3000')
        .get('/token')
        .auth('foo@bar', 'bar')
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('POST /users/:id/games/', function() {
    it('should create user backlog then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .post('/users/2/games')
        .set({ "Authorization": `Bearer ${token}` })
        .send({"title":"bloodborne","progress":"first bonfire"})
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('PUT /users/:id/games/:id', function() {
    it('should update a backlog then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .post('/users/2/games/1')
        .set({ "Authorization": `Bearer ${token}` })
        .send({"title":"bloodborne","progress":"first bonfire"})
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
  describe('DELETE /users/:id/games/:id', function() {
    it('should delete a backlog then respond with status 200', function() {
      chai.request('http://localhost:3000')
        .delete('/users/2/games/1')
        .set({ "Authorization": `Bearer ${token}` })
        .then(function (res) {
          expect(res).to.have.status(200);
        })
        .catch(function (err) {
          throw err;
        });
    });
  });
});
