const { checkSchema } = require('express-validator');





const addFeaturesValidation =  checkSchema({


    nameAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    nameEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },


    descAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    descEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },

 
});


const updateFeaturesValidation =  checkSchema({


    nameAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    nameEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },


    descAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    descEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },

 
});



module.exports = {addFeaturesValidation , updateFeaturesValidation }