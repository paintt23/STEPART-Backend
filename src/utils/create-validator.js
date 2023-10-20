const error = require("../middlewares/error");

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = createError;
