const { checkSchema } = require("express-validator");

const addPackageValidation = checkSchema({
  period: {
    in: ["body"],
    optional: false,
    trim: true,
    isNumeric: true,
    errorMessage: "the period must be at number",
  },
  discountPercentage: {
    in: ["body"],
    optional: false,
    trim: true,
    isNumeric: true,
    errorMessage: "the discountPercentage must be at number",
  },
  price: {
    in: ["body"],
    optional: false,
    trim: true,
    isNumeric: true,
    errorMessage: "the price must be at number",
  },
  titleAr: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "titleAr contain at least 3 chars ",
    },
  },
  titleEn: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "titleEn contain at least 3 chars ",
    },
  },
  descriptionAr: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "descriptionAr contain at least 7 char ",
    },
  },
  descriptionEn: {
    in: ["body"],
    
    optional: false,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "descriptionEn contain at least 7 char ",
    },
  },
  packageFeatures: {
    isArray: {
      errorMessage: 'packageFeatures must be an array',
    },
    
    custom: {
      
      options: (value) => {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error(' array must contain at least one element');
        }
        for (const obj of value) {
          if (typeof obj !== 'object' || Object.values(obj).some(val => (typeof val !== 'string') || (val == ''))) {
            throw new Error('keys ( featureEn & featureAr) must have an string value');
          }
          if( !obj['featureEn'] || !obj['featureAr'] ){
            throw new Error('keys ( featureEn & featureAr) are required');

          }
        }
        return true; // Validation passed
      }
    },
    
  }
});

const updatePackageValidation = checkSchema({
  period: {
    in: ["body"],
    optional: true,
    trim: true,
    isNumeric: true,
    errorMessage: "the period must be at number",
  },
  discountPercentage: {
    in: ["body"],
    optional: true,
    trim: true,
    isNumeric: true,
    errorMessage: "the discountPercentage must be at number",
  },
  price: {
    in: ["body"],
    optional: true,
    trim: true,
    isNumeric: true,
    errorMessage: "the price must be at number",
  },
  titleAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "titleAr contain at least 3 chars ",
    },
  },
  titleEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 3 },
      errorMessage: "titleEn contain at least 3 chars ",
    },
  },
  descriptionAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "descriptionAr contain at least 7 char ",
    },
  },
  descriptionEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "descriptionEn contain at least 7 char ",
    },
  },
  packageFeatures: {
    isArray: {
      errorMessage: 'packageFeatures must be an array',
    },
    optional:true,
    custom: {
      
      options: (value) => {
        if (!Array.isArray(value) || value.length === 0) {
          throw new Error(' array must contain at least one element');
        }
        for (const obj of value) {
          if (typeof obj !== 'object' || Object.values(obj).some(val => (typeof val !== 'string') || (val == ''))) {
            throw new Error('keys ( featureEn & featureAr) must have an string value');
          }
          if( !obj['featureEn'] || !obj['featureAr'] ){
            throw new Error('keys ( featureEn & featureAr) are required');

          }
        }
        return true; // Validation passed
      }
    },
    
  }
});


// const validateFeatures = (value) => {
//   if (!Array.isArray(value) || value.length === 0) {
//     throw new Error(' array must contain at least one element');
//   }
//   for (const obj of value) {
//     if (typeof obj !== 'object' || Object.values(obj).some(val => (typeof val !== 'string') || (val == ''))) {

//       console.log("hellooooooooo")
//       throw new Error('Each element of the nested array must be an object with string values');
//     }
//     if( !obj['featureEn'] || !obj['featureAr'] ){
//       throw new Error('Each element of the nested array must be an object with string values');
//     }
//   }
//   return true; // Validation passed
// }

module.exports = { addPackageValidation, updatePackageValidation };
