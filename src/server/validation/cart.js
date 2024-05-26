const { checkSchema } = require('express-validator');


const requiredQuantity =  checkSchema({

    quantity: {
        in: ['body'],
        optional:false,
        trim:true,
        isAlphanumeric: {
            errorMessage: 'must be a number',
        },
        errorMessage: 'quantity is required',
    },

});


const addCartItemValidation =  checkSchema({

    quantity: {
        in: ['body'],
        optional:false,
        trim:true,
        isAlphanumeric: {
            errorMessage: 'must be a number',
        },
        errorMessage: 'quantity is required',
    },
    itemId: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 1 },
            errorMessage: 'item id is requird',

          },
    },

});










module.exports = { requiredQuantity  , addCartItemValidation  }