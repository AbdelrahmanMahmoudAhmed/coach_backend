const { checkSchema } = require('express-validator');





const addVideoValidation =  checkSchema({

    link: {
        in: ['body'],
        optional:false,
        trim:true,
        isURL:true,
        errorMessage: 'must be a valid url'
        
    },

    descriptionAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },
    descriptionEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },

    titleAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    titleEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    
});



const updateVideoValidation =  checkSchema({

    link: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL:true,
        errorMessage: 'must be a valid url'
        
    },

    descriptionAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },
    descriptionEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },

    titleAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    titleEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    
});

module.exports = {addVideoValidation  , updateVideoValidation}