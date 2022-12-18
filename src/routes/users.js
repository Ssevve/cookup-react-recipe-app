/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
const router = require('express').Router();

const usersController = require('../controllers/users');

router.get('/:userId', usersController.getUserProfileInfo);

module.exports = router;
