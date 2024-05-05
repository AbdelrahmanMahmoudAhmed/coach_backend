const { validationResult } = require("express-validator");
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");

const validationChecker = async (req, res) => {
  const errors = validationResult(req);

  // Check for validation errors
  if (!errors.isEmpty()) {
    throw createAppError(errors.array(), HttpStatus.BadRequest, 5);
  } else {
    return true;
  }
};

module.exports = validationChecker;
