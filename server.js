const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('./data/users.json');
const api = require('./api/routes');

const port = 5000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// connect to DB
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults(users).write();

// setting up passport
app.use(passport.initialize());

// passport-jwt strategy
// source: http://www.passportjs.org/packages/passport-jwt/
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const user = db
      .get('users')
      .find({ guid: jwt_payload.id })
      .value();

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

// routes
app.use('/api', api);

app.listen(port, () => console.log(`server up and running on ${port}`));
