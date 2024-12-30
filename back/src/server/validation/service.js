const { checkSchema } = require('express-validator');





const addServiceValidation =  checkSchema({


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


    shortDescAr:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },
    shortDescEn:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },

    mainDescAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    mainDescEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    isCommingSoon: {
        in: ['body'],
        optional:false,
        trim:true,
        isBoolean: {
            errorMessage: 'The value must be true or false'
        },
        // isIn: {
        //     options: [['0', '1', 0, 1]], 
        //     errorMessage: 'The value must be 0 or 1'
        // },
    },
 
});

const updateServiceValidation =  checkSchema({


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


    shortDescAr:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },
    shortDescEn:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },

    mainDescAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    mainDescEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    isCommingSoon: {
        in: ['body'],
        optional:true,
        trim:true,
        isBoolean: {
            errorMessage: 'The value must be true or false'
        },
        // isIn: {
        //     options: [['0', '1', 0, 1]], 
        //     errorMessage: 'The value must be 0 or 1'
        // },
    },
 
});







module.exports = {addServiceValidation , updateServiceValidation }