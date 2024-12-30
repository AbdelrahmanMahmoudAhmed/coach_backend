const { checkSchema } = require('express-validator');





const addProjectValidation =  checkSchema({


    nameAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    nameEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    shortDescAr:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the shortDescAr must be at least 2 characters'
        }
    },
    shortDescEn:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the shortDescEn must be at least 2 characters'
        }
    },

    longDescAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    longDescEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    keyObjectivesAr: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the keyObjectivesAr must be at least 10 characters'
        }
    },
    keyObjectivesEn: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the keyObjectivesEn must be at least 10 characters'
        }
    },
    download: {
        in: ['body'],
        optional: false,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Download must be a positive integer',
        },
    },
    duration: {
        in: ['body'],
        optional: false,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Duration must be a positive integer',
        },
    },
    rating: {
        in: ['body'],
        optional: false,
        isDecimal: {
            options: { decimal_digits: '1,2' },
            errorMessage: 'Rating must be a decimal with up to 2 decimal places',
        },
    },
    displayInHome: {
        in: ['body'],
        optional: false,
        trim:true,
        isBoolean: {
            errorMessage: 'The value must be true or false'
        },
    },
    color: {
        in: ['body'],
        optional: false,
        matches: {
            options: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
            errorMessage: 'Color must be in the hexadecimal format, e.g., #ffffff',
        },
    },
    languages: {
        in: ['body'],
        optional: false,
        isArray: {
            errorMessage: 'Languages must be an array of objects',
        },
        custom: {
            options: (value) => {
                // Ensure every object has valid `nameAr` and `nameEn`
                if (!Array.isArray(value)) return false;

                for (const obj of value) {
                    if (typeof obj.nameAr !== 'string' || typeof obj.nameEn !== 'string') {
                        return false;
                    }
                }
                return true;
            },
            errorMessage:
                'Each language must be an object with `nameAr` and `nameEn` as strings',
        },
    },
    challenges: {
        in: ['body'],
        optional: false,
        isArray: {
            errorMessage: 'challenges must be an array of objects',
        },
        custom: {
            options: (value) => {
                // Ensure every object has valid `nameAr` and `nameEn`
                if (!Array.isArray(value)) return false;

                for (const obj of value) {
                    if (typeof obj.nameAr !== 'string' || typeof obj.nameEn !== 'string') {
                        return false;
                    }
                }
                return true;
            },
            errorMessage:
                'Each challenge must be an object with `nameAr` and `nameEn` as strings',
        },
    },
    platForms: {
        in: ['body'],
        isArray: {
          errorMessage: 'platForms must be an array',
        },
        customSanitizer: {
          options: (values) => {
            if( !Array.isArray(values) && !values?.length) return false;
            // Ensure all values are converted to numbers
            return values?.map((value) => {
              const num = Number(value);
              if (isNaN(num)) {
                return value
              }
              return num;
            });
          },
        },
        custom: {
          options: (values) => {
            // Validate that all items are numbers after sanitization
            return values.every((num) => typeof num === 'number');
          },
          errorMessage: 'Each item in platForms must be a valid number',
        },
      },
      services: {
        in: ['body'],
        isArray: {
          errorMessage: 'services must be an array',
        },
        customSanitizer: {
          options: (values) => {
            // Ensure all values are converted to numbers
            if( !Array.isArray(values) && !values?.length) return false;

            return values?.map((value) => {
              const num = Number(value);
              if (isNaN(num)) {
                return value
              }
              return num;
            });
          },
        },
        custom: {
          options: (values) => {
            // Validate that all items are numbers after sanitization
            return values.every((num) => typeof num === 'number');
          },
          errorMessage: 'Each item in services must be a valid number',
        },
      },
      clientName: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the clientName must be at least 2 characters'
        }
    },
    clientJobTitle: {
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the clientJobTitle must be at least 2 characters'
        }
    },
    clientDesc:{
        in: ['body'],
        optional:false,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the clientDesc must be at least 10 characters'
        }
    },
 
 
});
const updateProjectValidation =  checkSchema({


    nameAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    nameEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the name must be at least 2 characters'
        }
    },
    shortDescAr:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the shortDescAr must be at least 2 characters'
        }
    },
    shortDescEn:{
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 2 },
            errorMessage: 'the shortDescEn must be at least 2 characters'
        }
    },

    longDescAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    longDescEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the description must be at least 10 characters'
        }
    },
    keyObjectivesAr: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the keyObjectivesAr must be at least 10 characters'
        }
    },
    keyObjectivesEn: {
        in: ['body'],
        optional:true,
        trim:true,
        isLength: {
            options: { min: 10 },
            errorMessage: 'the keyObjectivesEn must be at least 10 characters'
        }
    },
    download: {
        in: ['body'],
        optional: true,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Download must be a positive integer',
        },
    },
    duration: {
        in: ['body'],
        optional: true,
        isInt: {
            options: { min: 0 },
            errorMessage: 'Duration must be a positive integer',
        },
    },
    rating: {
        in: ['body'],
        optional: true,
        isDecimal: {
            options: { decimal_digits: '1,2' },
            errorMessage: 'Rating must be a decimal with up to 2 decimal places',
        },
    },
    displayInHome: {
        in: ['body'],
        optional: true,
        trim:true,
        isBoolean: {
            errorMessage: 'The value must be true or false'
        },
    },
    color: {
        in: ['body'],
        optional: true,
        matches: {
            options: /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/,
            errorMessage: 'Color must be in the hexadecimal format, e.g., #ffffff',
        },
    },
    languages: {
        in: ['body'],
        optional: true,
        isArray: {
            errorMessage: 'Languages must be an array of objects',
        },
        custom: {
            options: (value) => {
                // Ensure every object has valid `nameAr` and `nameEn`
                if (!Array.isArray(value)) return false;

                for (const obj of value) {
                    if (typeof obj.nameAr !== 'string' || typeof obj.nameEn !== 'string') {
                        return false;
                    }
                }
                return true;
            },
            errorMessage:
                'Each language must be an object with `nameAr` and `nameEn` as strings',
        },
    },
    challenges: {
        in: ['body'],
        optional: true,
        isArray: {
            errorMessage: 'challenges must be an array of objects',
        },
        custom: {
            options: (value) => {
                // Ensure every object has valid `nameAr` and `nameEn`
                if (!Array.isArray(value)) return false;

                for (const obj of value) {
                    if (typeof obj.nameAr !== 'string' || typeof obj.nameEn !== 'string') {
                        return false;
                    }
                }
                return true;
            },
            errorMessage:
                'Each challenge must be an object with `nameAr` and `nameEn` as strings',
        },
    },
    platForms: {
        in: ['body'],
        optional: true,
        isArray: {
          errorMessage: 'platForms must be an array',
        },
        customSanitizer: {
          options: (values) => {
            if( !Array.isArray(values) && !values?.length) return false;
            // Ensure all values are converted to numbers
            return values?.map((value) => {
              const num = Number(value);
              if (isNaN(num)) {
                return value
              }
              return num;
            });
          },
        },
        custom: {
          options: (values) => {
            // Validate that all items are numbers after sanitization
            return values.every((num) => typeof num === 'number');
          },
          errorMessage: 'Each item in platForms must be a valid number',
        },
      },
      services: {
        optional: true,

        in: ['body'],
        isArray: {
          errorMessage: 'services must be an array',
        },
        customSanitizer: {
          options: (values) => {
            // Ensure all values are converted to numbers
            if( !Array.isArray(values) && !values?.length) return false;

            return values?.map((value) => {
              const num = Number(value);
              if (isNaN(num)) {
                return value
              }
              return num;
            });
          },
        },
        custom: {
          options: (values) => {
            // Validate that all items are numbers after sanitization
            return values.every((num) => typeof num === 'number');
          },
          errorMessage: 'Each item in services must be a valid number',
        },
      },
 
 
});





const updateProjectFeedbackValidation =  checkSchema({


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





module.exports = {addProjectValidation , updateProjectValidation  , updateProjectFeedbackValidation }