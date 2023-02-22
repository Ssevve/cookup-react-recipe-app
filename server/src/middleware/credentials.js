const credentials = (req, res, next) => {
  const { origin } = req.headers;
  if (origin === process.env.CORS_ORIGIN) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

module.exports = credentials;
