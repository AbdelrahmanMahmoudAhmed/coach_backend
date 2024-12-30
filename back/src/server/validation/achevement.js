const { checkSchema } = require('express-validator');





const addAchevementValidation =  checkSchema({


    year: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    descAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 , max:255},
            errorMessage: ' minimum length is 10 char, and max is 255'
        }
    },
    descEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 , max:255},
            errorMessage: ' minimum length is 10 char, and max is 255'
        }
    },    
});


const updateAchevementValidation =  checkSchema({


    year: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    descAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum length is 10 char'
        }
    },
    descEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum length is 10 char '
        }
    },    
});





module.exports = {addAchevementValidation ,updateAchevementValidation  }