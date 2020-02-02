const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  // this function will call our error handling middleware
  next(error);
};

// error handling middleware
// eslint-disable-next-line
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : '🥞',
  });
};

module.exports = {
  notFound,
  errorHandler,
};
