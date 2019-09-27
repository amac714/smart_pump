// Unit tests for API routes

const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe('API', () => {
  describe('Login', () => {
    const validUserInfo = {
      email: 'ruby.glenn@waterbaby.co.uk',
      password: 'red^adl4',
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
          res.body.error.should.equal('Email or password is invalid.');
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
});
