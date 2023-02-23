/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const isEmail = require('validator/lib/isEmail');
const passport = require('passport');
const User = require('../models/User');

const getUserFromSession = (req, res) => {
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
};

const login = (req, res, next) => {
  const errorMessage = 'Incorrect username or password.';

  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: errorMessage });
  if (!isEmail(email)) return res.status(400).json({ message: errorMessage });
  if (!password) return res.status(400).json({ message: errorMessage });
  if (password.length < 8) return res.status(400).json({ message: errorMessage });

  passport.authenticate('local', (err, user) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: errorMessage });
    }

    req.logIn(user, (error) => {
      if (err) return next(error);
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
};

const signup = (req, res, next) => {
  const validationErrors = {};

  const { firstName, lastName, email, password } = req.body;

  if (!firstName) validationErrors.firstName = 'First name cannot be empty';
  if (!lastName) validationErrors.lastName = 'Last name cannot be empty';

  if (!email) validationErrors.email = 'Email cannot be empty';
  else if (!isEmail(email)) validationErrors.email = 'Email is not valid';

  if (password.length < 8) {
    validationErrors.password = 'Password must be at least 8 characters long';
  }

  if (Object.keys(validationErrors).length) {
    return res.status(400).json({ message: validationErrors });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) return next(err);
    if (existingUser)
      return res.status(409).json({ message: { email: 'Email is already in use' } });

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    user.save((error) => {
      if (error) return next(error);
      return res.json({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        },
      });
    });
  });
};

const logout = (req, res, next) => {
  if (req.user) {
    req.logout((err) => {
      if (err) return next(err);

      req.session.destroy(() => {
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
};

module.exports = {
  getUserFromSession,
  login,
  signup,
  logout,
};
