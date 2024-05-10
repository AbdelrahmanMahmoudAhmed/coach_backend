const { checkSchema } = require('express-validator');


const addClientValidation =  checkSchema({

    name: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    email: {
        in: ['body'],
        optional:false,
        trim:true,
       isEmail:true,
       errorMessage:"this field must be an email"
    },
    password: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 10 characters'
        }
    },
    phone: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'not valid phone'
        }
    },
    goal: {
        in: ['body'],
        optional: false,
        trim: true,
        isIn: {
            
            options: [['loseFat', 'loseWeight', 'gainMuscle', 'gainWeight', 'maintain']],
            errorMessage: "Must be one of ('loseFat', 'loseWeight', 'gainMuscle', 'gainWeight', 'maintain')"
        }
    },
    tall: {
        in: ['body'],
        optional:false,
        trim:true,
        isNumeric:true,
        isLength: {
            options: { min: 2 },
        },
        errorMessage: 'add a valid tall'

    },
    weight: {
        in: ['body'],
        optional:false,
        trim:true,
        isNumeric:true,
        isLength: {
            options: { min: 2 },
        },
        errorMessage: 'add a valid weight'

    },
});





const updateClientValidation =  checkSchema({

    name: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the name must be at least 6 characters'
        }
    },
    email: {
        in: ['body'],
        optional:true,
        trim:true,
        isEmail:true,
        errorMessage:"this field must be an email"

    },
    password: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 6 },
            errorMessage: 'the password must be at least 10 characters'
        }
    },
    phone: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 7 },
            errorMessage: 'not valid phone'
        }
    },
    goal: {
        in: ['body'],
        optional: true,
        trim: true,
        isIn: {
            
            options: [['loseFat', 'loseWeight', 'gainMuscle', 'gainWeight', 'maintain']],
            errorMessage: "Must be one of ('loseFat', 'loseWeight', 'gainMuscle', 'gainWeight', 'maintain')"
        }
    },
    tall: {
        in: ['body'],
        optional:true,
        trim:true,
        isNumeric:true,
        isLength: {
            options: { min: 2 },
        },
        errorMessage: 'add a valid tall'

    },
    weight: {
        in: ['body'],
        optional:true,
        trim:true,
        isNumeric:true,
        isLength: {
            options: { min: 2 },
        },
        errorMessage: 'add a valid weight'

    },
});




module.exports = { addClientValidation , updateClientValidation  }