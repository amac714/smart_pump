const express = require('express');
const jwt = require('jsonwebtoken');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const passport = require('passport');
const { check, oneOf, validationResult } = require('express-validator');

// set up router and connect to DB
const router = express.Router();
const adapter = new FileSync('db.json');
const db = low(adapter);

// Login route
// Lets user sign in with email and password
// uses express-validator middleware to check if email is valid and password is not empty
router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ error: 'Email or password is invalid' });
    }

    const { email, password } = req.body;

    // find user in db by email
    const user = db
      .get('users')
      .find({ email: email })
      .value();

    // if user exists and password is correct, create a payload with user info
    // and sign jsonwebtoken for auth
    if (user && user.password === password) {
      const payload = {
        id: user.guid,
        firstName: user.name.first,
        lastName: user.name.last,
      };

      jwt.sign(payload, 'secret', { expiresIn: 604800 }, (err, token) => {
        res.status(200).json({
          success: true,
          token: 'Bearer ' + token,
        });
      });
    } else {
      return res.status(400).json({ error: 'Email or Password is incorrect.' });
    }
  }
);

// Get user's data. Must be logged in to access
router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const data = db
      .get('users')
      .find({ guid: req.user.guid })
      .value();

    res.status(200).json(data);
  }
);

// edit user data route
// must be authenticated to access
// validates user inputs, they all must have a value
router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  oneOf([
    [
      check('email').isEmail(),
      check('password').exists().isLength({min: 6}),
      check('picture').exists(),
      check('age').exists(),
      check('eyeColor').exists(),
      check('firstName').exists(),
      check('lastName').exists(),
      check('company').exists(),
      check('phone').exists(),
      check('address').exists(),
    ],
  ]),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // destructuring user inputs
    const {
      isActive,
      email,
      password,
      picture,
      age,
      eyeColor,
      firstName,
      lastName,
      company,
      phone,
      address,
    } = req.body;

    // update user info with new values or keep the same
    db.get('users')
      .find({ guid: req.user.guid })
      .assign(
        { isActive: isActive },
        { email: email },
        { password: password },
        { picture: picture },
        { age: age },
        { eyeColor: eyeColor },
        { name: { first: firstName, last: lastName } },
        { company: company },
        { phone: phone },
        { address: address }
      )
      .write();

    res.status(200).json('success');
  }
);

// logout user
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json('success. you are logged out');
});

module.exports = router;
