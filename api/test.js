// Unit tests for API routes

const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:5000');

describe('API', () => {
  describe('Login', () => {
    const validUserInfo = {
      email: 'henderson.briggs@geeknet.net',
      password: '23derd*334',
    };

    it('should login user and return status 200 with success = true', done => {
      server
        .post('/api/login')
        .send(validUserInfo)
        .end((err, res) => {
          if (err) done(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          done();
        });
    });

    const invalidUserInfo = {
      email: 'invalid.email@yahoo.com',
      password: '123456',
    };
    
    it('should fail to login with incorrect user info', done => {
      server
        .post('/api/login')
        .send(invalidUserInfo)
        .end((err, res) => {
          if (err) done(err);
          res.status.should.equal(400);
          res.body.error.should.equal('Email or Password is incorrect.');
          done();
        });
    });

    const invalidUserInput = {
      email: 'starbucks',
      password: '1',
    };

    it('should fail to validate because of invalid user inputs', done => {
      server
        .post('/api/login')
        .send(invalidUserInput)
        .end((err, res) => {
          if (err) done(err);
          res.status.should.equal(422);
          done();
        });
    });
  });

  describe('GET /user', () => {
    const user = {
      email: 'lott.kramer@poshome.us',
      password: '34oii+345',
    };
    
    let token;

    // must log in first to get token
    before(done => {
      server
        .post('/api/login')
        .send(user)
        .end((err, res) => {
          if(err) throw err;
          token = {
            Authorization: res.body.token
          };
          done();
        });
    });

    it('should return user data with status 200', done => {
      server
        .get('/api/user')
        .set(token)
        .end((err, res) => {
          if(err) done(err);
          res.status.should.equal(200);
          done();
        });
    });
  });
});
