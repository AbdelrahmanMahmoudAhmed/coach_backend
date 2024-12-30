const { checkSchema } = require("express-validator");

const loginValidation = checkSchema({
  email: {
    in: ["body"],
    optional: false,
    trim: true,
    isEmail: true,
    errorMessage: "this field must be an email",
  },
  password: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: "the password must be at least 6 characters",
    },
  },
});



module.exports = { loginValidation };
