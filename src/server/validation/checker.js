const { validationResult } = require("express-validator");
const { createAppError } = require("../utils/error");
const { HttpStatus } = require("../utils/httpCodes");
const { validationErr } = require("../../constant/errors");

const validationChecker = async (req, res) => {
  const errors = validationResult(req);

  // Check for validation errors
  if (!errors.isEmpty()) {
    throw createAppError(errors.array(), HttpStatus.BadRequest, validationErr);
  } else {
    return true;
  }
};

module.exports = validationChecker;
