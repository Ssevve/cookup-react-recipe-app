/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();

const User = require('../models/User');

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId })
      .select('firstName lastName _id avatar');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
