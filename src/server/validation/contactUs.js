const { checkSchema } = require('express-validator');





const addMessageValidation =  checkSchema({


    name: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    email: {
        in: ['body'],
        optional:false,
        trim:true,
        isEmail: {
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    phone: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 11 },
            errorMessage: 'write a right phone'
        }
    },
    title: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    message: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },
 



    
});





module.exports = {addMessageValidation  }