const HttpStatus = require("./httpCodes").HttpStatus;
const codeToString = require("./httpCodes").codeToString;

const createAppError = (err, httpCode, customCode = 0) => {
  const errors = [];
  let stringError = ""
  if (err instanceof Error) {
    errors.push(err.message);
  } else if (typeof err === "string") {
    stringError = err;
  } else {
    errors.push( ...err);
  }


  return {
    success: false,
    message: codeToString(httpCode),
    httpCode,
    customCode,
    errors : errors.length ? errors : stringError,
  };
};

const serverError = createAppError(
  "We encountered an unexpected error while processing your request.",
  HttpStatus.InternalServerError,
  500
);


module.exports = { serverError, createAppError };
