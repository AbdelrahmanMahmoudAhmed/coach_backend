const { checkSchema } = require('express-validator');
const isoCountryCodes = [
    "AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", 
    "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", 
    "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", 
    "BV", "BR", "IO", "BN", "BG", "BF", "BI", "CV", "KH", "CM", 
    "CA", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", 
    "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", 
    "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", 
    "SZ", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", 
    "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", 
    "GU", "GT", "GG", "GN", "GW", "GY", "HT", "HM", "VA", "HN", 
    "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", 
    "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", 
    "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", 
    "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", 
    "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", 
    "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", 
    "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", 
    "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", 
    "QA", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", 
    "PM", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", 
    "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", 
    "LK", "SD", "SR", "SJ", "SE", "CH", "SY", "TW", "TJ", "TZ", 
    "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", 
    "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", 
    "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"
  ];

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
            options: { min: 8 },
            errorMessage: 'the password must be at least 8 characters'
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

    country: {
        in: ['body'],
        optional:false,
        trim:true,
        custom: {
            options: (value) => {
              const uppercasedValue = value.toUpperCase();
              if (!isoCountryCodes.includes(uppercasedValue)) {
                throw new Error('Invalid country code');
              }
              return true;
            }
          },
        errorMessage: 'country is required'

    },
    favouriteMeals: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the favouriteMeals must be at least 3 characters'
        }
    },
    unFavouriteMeals: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the un favouriteMeals must be at least 3 characters'
        }
    },
    diseaseType: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the un diseaseType must be at least 3 characters'
        }
    },
    hasDisease: {
        in: ['body'],
        optional:true,
        toBoolean: true,
        isBoolean: {
            errorMessage: 'must be a boolean value'
          },
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
            options: { min: 8 },
            errorMessage: 'the password must be at least 8 characters'
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
    country: {
        in: ['body'],
        optional:true,
        trim:true,
        custom: {
            options: (value) => {
              const uppercasedValue = value.toUpperCase();
              if (!isoCountryCodes.includes(uppercasedValue)) {
                throw new Error('Invalid country code');
              }
              return true;
            }
          },
        errorMessage: 'country is required'

    },
    favouriteMeals: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the favouriteMeals must be at least 3 characters'
        }
    },
    unFavouriteMeals: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the un favouriteMeals must be at least 3 characters'
        }
    },
    diseaseType: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'the un diseaseType must be at least 3 characters'
        }
    },
    hasDisease: {
        in: ['body'],
        optional:true,
        toBoolean: true,
        isBoolean: {
            errorMessage: 'must be a boolean value'
          },
    },
});




module.exports = { addClientValidation , updateClientValidation  }