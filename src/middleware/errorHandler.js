/* eslint-disable no-unused-vars */
function errorHandler(error, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // Make sure to set the env var on the deployed server to production
    // to not show the stack in the error
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
}

module.exports = errorHandler;
