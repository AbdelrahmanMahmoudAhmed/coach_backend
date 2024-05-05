const { checkSchema } = require('express-validator');


const addQuickAnswerValidation =  checkSchema({

    questionAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the question must be at least 6 characters'
        }
    },
    questionEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the question must be at least 6 characters'
        }
    },
    answerAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the answer must be at least 10 characters'
        }
    },
    answerEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the answer must be at least 10 characters'
        }
    }
});





const updatedValue = {}



const updateQuickAnswerValidation =  checkSchema({

    questionAr: {
        in: ['body'],
        optional: true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the question must be at least 6 characters'
        }
    },
    questionEn: {
        in: ['body'],
        optional: true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the question must be at least 6 characters'
        }
    },
    answerAr: {
        in: ['body'],
        optional: true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the answer must be at least 10 characters'
        }
    },
    answerEn: {
        in: ['body'],
        optional: true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the answer must be at least 10 characters'
        }
    }
});

module.exports = { addQuickAnswerValidation , updateQuickAnswerValidation  }