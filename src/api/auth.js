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

module.exports = router;
