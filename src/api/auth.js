/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/', (req, res) => {
  console.log(req);
  if (req.user) {
    const user = {
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
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.status(400).json({ error: 'Email taken' });

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
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
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user)
      return res.status(400).json({ error: 'Incorrect username or password' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        user: {
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
    });

    req.session.destroy((err) => {
      if (!err) {
        return res
          .status(200)
          .clearCookie('connect.sid', { path: '/' })
          .json({ message: 'Session destroyed and user logged out.' });
      }
      return res.json({ message: 'Could not destroy the session.' });
    });
  } else {
    res.json({ message: 'No user to log out' });
  }
});

module.exports = router;
