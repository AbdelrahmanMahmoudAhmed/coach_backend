const { checkSchema } = require('express-validator');





const emailValidation =  checkSchema({

    email: {
        in: ['body'],
        optional:false,
        trim:true,
       isEmail:true,
       errorMessage:"this field must be an email"
    },

});


const resetPasswordValidation =  checkSchema({


    newPassword: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 6 characters'
        }
    },
    passwordConfirmation: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 6 characters'
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('Password confirmation does not match new password');
                }
                return true;
            }
        }
    },

});














module.exports = {  emailValidation , resetPasswordValidation  }