const { checkSchema } = require("express-validator");

const addSubscriptionValidation = checkSchema({
  email: {
    in: ["body"],
    optional: false,
    trim: true,
    isEmail: true,
    errorMessage: "this field must be an email",
  },
});

const sendEmailValidation = checkSchema({
  subject: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  content: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
});



module.exports = { addSubscriptionValidation ,sendEmailValidation };
