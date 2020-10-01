const notFound = (req, res, next) => {
  res.status(404);
  return next(new Error(`Not Found - ${req.originalUrl}`));
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🎂' : err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
