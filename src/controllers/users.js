const User = require('../models/User');

const getUserProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.params.userId })
      .select('firstName lastName _id avatar');
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserProfileInfo,
};
