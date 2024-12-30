const { checkSchema } = require('express-validator');







const updateAdminValidation =  checkSchema({

    name: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    email: {
        in: ['body'],
        optional:true,
        trim:true,
        isEmail:true,
        errorMessage:"this field must be an email"

    },


});
const updatePasswordValidation =  checkSchema({


    password: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 6 characters'
        }
    },
    newPassword:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 6 characters'
        }
    },
    confirmNewPassword:{
        custom: {
            options: (value, { req }) => {
                if (req.body.newPassword !== req.body.confirmNewPassword) {
                    throw new Error('New password and confirm new password must be the same');
                }
                return true;
            }
        }
    },

});




module.exports = {  updateAdminValidation , updatePasswordValidation  }