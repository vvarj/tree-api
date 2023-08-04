const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error.name === "ValidationError") {
        // To handle validator errors
        let errors = {};
        for (const field in error.errors) {
          if (error.errors.hasOwnProperty(field)) {
            errors[field] = error.errors[field].message;
          }
        }
        return next({ errors: errors, message: "Validation error" });
      }
      next(error);
    }
  };
};

module.exports = asyncWrapper;
