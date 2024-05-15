const { checkSchema } = require('express-validator');





const manageLayout =  checkSchema({


    email: {
        in: ['body'],
        optional:true,
        trim:true,
        isEmail: {
            errorMessage: ' must be email'
        }
    },

    phone: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 11 },
            errorMessage: 'write a right phone'
        }
    },
    footerDesc: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum 10 char'
        }
    },
    mainDesc: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum 10 char'
        }
    },
    terms: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum 10 char'
        }
    },
    policy: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: ' minimum 10 char'
        }
    },




    title: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },

    description: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the description must be at least 5 characters'
        }
    },
    keyWords: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'the keyWords must be at least 5 characters'
        }
    },

    facebook: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL: {
            errorMessage: 'must be URL'
        }
    },
    x: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL: {
            errorMessage: 'must be URL'
        }
    },
    youtube: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL: {
            errorMessage: 'must be URL'
        }
    },
    instagram: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL: {
            errorMessage: 'must be URL'
        }
    },
    tiktok: {
        in: ['body'],
        optional:true,
        trim:true,
        isURL: {
            errorMessage: 'must be URL'
        }
    },
 
});





module.exports = {manageLayout  }