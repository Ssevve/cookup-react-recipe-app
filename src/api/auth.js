/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    // TODO: Add validation
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser) return res.json({ message: 'Email taken' });

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err) => {
      if (err) return next(err);
      return res.json({ user });
    });
  });
});

router.post('/login', (req, res, next) => {
  // TODO: Add validation
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) return res.json({ error: 'User not found' });
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ user });
    });
  })(req, res, next);
});

module.exports = router;
