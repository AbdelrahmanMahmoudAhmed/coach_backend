const { checkSchema } = require('express-validator');


const changePasswordValidation =  checkSchema({

    oldPassword: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 10 characters'
        }
    },
    newPassword: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 10 characters'
        }
    },
    passwordConfirmation: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 10 characters'
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













module.exports = { changePasswordValidation    }