/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const router = require('express').Router();
const passport = require('passport');
const isEmail = require('validator/lib/isEmail');
const User = require('../models/User');

router.get('/', (req, res) => {
  if (req.user) {
    const user = {
      id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      avatar: req.user.avatar,
    };

    res.json({ user });
  } else {
    res.json({ user: null });
  }
});

router.post('/signup', (req, res, next) => {
  const validationErrors = [];

  const {
    firstName, lastName, email, password,
  } = req.body;

  if (!firstName) validationErrors.push('First name cannot be empty');
  if (!lastName) validationErrors.push('Last name cannot be empty');

  if (!email) validationErrors.push('Email cannot be empty');
  else if (!isEmail(email)) validationErrors.push('Email is not valid');

  if (password.length < 8) validationErrors.push('Password must be at least 8 characters long');

  if (validationErrors.length) return res.status(400).json({ message: validationErrors });

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(400).json({ message: 'Email is already in use' });

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    user.save((err) => {
      if (err) return next(err);
      return res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        },
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  const error = 'Incorrect username or password.';

  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: error });
  if (!isEmail(email)) return res.status(400).json({ message: error });
  if (!password) return res.status(400).json({ message: error });
  if (password.length < 8) return res.status(400).json({ message: error });

  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: error });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        },
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  if (req.user) {
    req.logout((err) => {
      if (err) return next(err);

      req.session.destroy((err) => {
        if (!err) {
          return res
            .status(200)
            .clearCookie('connect.sid', { path: '/' })
            .json({ message: 'Session destroyed and user logged out.' });
        }
        return res.json({ message: 'Could not destroy the session.' });
      });
    });
  } else {
    return res.json({ message: 'No user to log out' });
  }
});

module.exports = router;
