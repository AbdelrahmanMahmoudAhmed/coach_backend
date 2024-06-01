const { checkSchema } = require('express-validator');


const allOrdersValidation =  checkSchema({

    type: {
        in: ['query'],
        optional:true,
        trim:true,
        isIn: {
            options: [['product', 'package']],
            errorMessage: 'must be ( product or package )'
        },
    },
    paid: {
        in: ['query'],
        optional:true,
        trim:true,
        isIn: {
            options: [['1', '0']],
            errorMessage: 'must be  ( 0 or 1) '
        },
    },

});


const changePaidValidation =  checkSchema({


    paid: {
        in: ['body'],
        optional:false,
        trim:true,
        isIn: {
            options: [['1', '0']],
            errorMessage: 'must be  ( 0 or 1) '
        },
    },

});
const productOrderStateValidation =  checkSchema({


    state: {
        in: ['body'],
        optional:false,
        trim:true,
        isIn: {
            options: [['ordered' , 'prepared' , 'shipped' , 'arrived']],
            errorMessage: "must be  ('ordered','prepared', 'shipped' ,'arrived') "
        },
    },

}); 

const packageOrderStateValidation =  checkSchema({


    state: {
        in: ['body'],
        optional:true,
        trim:true,
        isIn: {
            options: [['ordered','pending', 'ready' ,'started' , 'progress' , 'finished']],
            errorMessage: "must be  ('ordered','prepared', 'shipped' ,'arrived') "
        },
    },
    dietPlanAr:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the diet plan must be at least 10 characters'
        }
    },
    dietPlanEn:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the diet plan must be at least 10 characters'
        }
    },
    supplementsAr:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'supplementsAr must be at least 10 characters'
        }
    },
    supplementsEn:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'supplementsEn must be at least 10 characters'
        }
    },
    trainingAr:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'trainingAr must be at least 10 characters'
        }
    },
    trainingEn:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'trainingEn must be at least 10 characters'
        }
    },

}); 













module.exports = { allOrdersValidation , changePaidValidation , productOrderStateValidation , packageOrderStateValidation   }