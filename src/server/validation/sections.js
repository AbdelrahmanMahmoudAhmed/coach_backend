const { checkSchema } = require('express-validator');





const sectionValidation =  checkSchema({

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
    nameAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    nameEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
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
    callToAction:{
        in: ['body'],
        optional:true,
        trim:true,
        isBoolean:true,
        errorMessage: 'the name must be at least 3 characters'
    },

    callToActionLink : {
        in: ['body'],
        optional:true,
        trim:true,
        isURL:true,
        errorMessage: 'must be a valid url'
    },
    
});

module.exports = sectionValidation  