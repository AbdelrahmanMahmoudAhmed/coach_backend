const { checkSchema } = require('express-validator');


const addProductValidation =  checkSchema({

    shippingPrice: {
        in: ['body'],
        optional:false,
        trim:true,
        isNumeric:true,
         errorMessage: 'the shippingPrice must be at number'
    },
    discountPercentage: {
        in: ['body'],
        optional:false,
        trim:true,
        isNumeric:true,
         errorMessage: 'the discountPercentage must be at number'
    },
    price: {
        in: ['body'],
        optional:false,
        trim:true,
        isNumeric:true,
         errorMessage: 'the price must be at number'
    },
    titleAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleAr contain at least 3 chars '
        }
    },
    titleEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleEn contain at least 3 chars '
        }
    },
    descriptionAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'descriptionAr contain at least 7 char '
        }
    },
    descriptionEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'descriptionEn contain at least 7 char '
        }
    },


  
});





const updateProductValidation =  checkSchema({
    shippingPrice: {
        in: ['body'],
        optional:true,
        trim:true,
        isNumeric:true,
         errorMessage: 'the shippingPrice must be at number'
    },
    discountPercentage: {
        in: ['body'],
        optional:true,
        trim:true,
        isNumeric:true,
         errorMessage: 'the discountPercentage must be at number'
    },
    price: {
        in: ['body'],
        optional:true,
        trim:true,
        isNumeric:true,
         errorMessage: 'the price must be at number'
    },
    titleAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleAr contain at least 3 chars '
        }
    },
    titleEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'titleEn contain at least 3 chars '
        }
    },
    descriptionAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'descriptionAr contain at least 7 char '
        }
    },
    descriptionEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'descriptionEn contain at least 7 char '
        }
    },


});




module.exports = { addProductValidation , updateProductValidation  }