const { checkSchema } = require('express-validator');


const addAdminValidation =  checkSchema({

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
    role: {
        in: ['body'],
        optional:false,
        trim:true,
        isIn: {
            options: [['admin', 'superAdmin']],
            errorMessage: 'must be admin or superAdmin'
        },
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
    allowEdit: {
        in: ['body'],
        optional:false,
        trim:true,
        isBoolean:  true,
            errorMessage: 'allowEdit must be boolean'
      
    },
    allowDelete: {
        in: ['body'],
        optional:false,
        trim:true,
        isBoolean:  true,
            errorMessage: 'allowDelete must be boolean'
    
    },
    websiteManagement: {
        in: ['body'],
        optional:false,
        trim:true,
        isBoolean: true,
            errorMessage: 'websiteManagement must be boolean'
   
    },
});





const updateAdminValidation =  checkSchema({

    name: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the name must be at least 3 characters'
        }
    },
    email: {
        in: ['body'],
        optional:true,
        trim:true,
        isEmail:true,
        errorMessage:"this field must be an email"
    //    isEmail:{
    //     options:true,
    //     errorMessage:"this field must be an email"
    //    },
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
    role: {
        in: ['body'],
        optional:true,
        trim:true,
        isIn: {
            options: [['admin', 'superAdmin']],
            errorMessage: 'must be admin or superAdmin'
        },
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
    allowEdit: {
        in: ['body'],
        optional:true,
        trim:true,
        isBoolean:  true,
            errorMessage: 'allowEdit must be boolean'
      
    },
    allowDelete: {
        in: ['body'],
        optional:true,
        trim:true,
        isBoolean:  true,
            errorMessage: 'allowDelete must be boolean'
    
    },
    websiteManagement: {
        in: ['body'],
        optional:true,
        trim:true,
        isBoolean: true,
            errorMessage: 'websiteManagement must be boolean'
   
    },
});




module.exports = { addAdminValidation , updateAdminValidation  }