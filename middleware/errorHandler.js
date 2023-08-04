const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: err?.message || "something went wrong",
    error: err?.errors || err,
  });
};

module.exports = errorHandlerMiddleware;
