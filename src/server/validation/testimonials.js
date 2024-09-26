const { checkSchema } = require('express-validator');


const addTestimonialValidation =  checkSchema({

    image: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            errorMessage: 'image is require'
        }
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
    }
});




const updateTestimonialValidation =  checkSchema({

    image: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            errorMessage: 'image is require'
        }
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
    }
});

module.exports = { addTestimonialValidation , updateTestimonialValidation  }