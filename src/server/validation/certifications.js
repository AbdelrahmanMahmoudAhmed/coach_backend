const { checkSchema } = require("express-validator");

const addCertificationValidation = checkSchema({
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
  contentAr: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "contentAr contain at least 7 char ",
    },
  },
  contentEn: {
    in: ["body"],
    optional: false,
    trim: true,
    isLength: {
      options: { min: 7 },
      errorMessage: "contentEn contain at least 7 char ",
    },
  },
});




const updateCertificationValidation = checkSchema({
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
      contentAr: {
        in: ["body"],
        optional: true,
        trim: true,
        isLength: {
          options: { min: 7 },
          errorMessage: "contentAr contain at least 7 char ",
        },
      },
      contentEn: {
        in: ["body"],
        optional: true,
        trim: true,
        isLength: {
          options: { min: 7 },
          errorMessage: "contentEn contain at least 7 char ",
        },
      },
});



module.exports = { addCertificationValidation, updateCertificationValidation };
