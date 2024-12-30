const { checkSchema } = require('express-validator');





const addFeedbackValidation =  checkSchema({


    name: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    jobTitle:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },

    desc: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
 
});


const updateFeedbackValidation =  checkSchema({


    name: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    jobTitle:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the jobTitle must be at least 2 characters'
        }
    },

    desc: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
 
});





module.exports = {addFeedbackValidation , updateFeedbackValidation  }