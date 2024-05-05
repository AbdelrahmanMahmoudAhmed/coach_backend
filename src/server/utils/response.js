const codeToString = require("./httpCodes").codeToString;

const successResponse = ( res ,data ,httpCode = 200) => {
  return res.status(httpCode).json({
    success: true,
    message: codeToString(httpCode),
    httpCode,
    data,
  });
};

module.exports = { successResponse };
