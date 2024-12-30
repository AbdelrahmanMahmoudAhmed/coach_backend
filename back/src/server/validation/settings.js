const { checkSchema } = require("express-validator");

const settingsValidation = checkSchema({
  heroDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  heroDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  chooseUsFirstTitleAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsFirstTitleEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsFirstDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  chooseUsFirstDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  chooseUsSecondTitleAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsSecondTitleEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsSecondDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  chooseUsSecondDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  chooseUsThirdTitleAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsThirdTitleEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  chooseUsThirdDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  chooseUsThirdDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  footerContentAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  footerContentEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  firstBranch: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  secondBranch: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  email: {
    in: ["body"],
    optional: true,
    trim: true,
    isEmail: {
      errorMessage: " must be email",
    },
  },

  contactEmail:{
    in: ["body"],
    optional: true,
    trim: true,
    isEmail: {
      errorMessage: " must be email",
    },
  },

  phone: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 11 },
      errorMessage: "write a right phone",
    },
  },

  policyAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  policyEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  termsAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  termsEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  keyWordsAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  keyWordsEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  title: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  description: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },

  facebook: {
    in: ["body"],
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "must be URL",
    },
  },

  linkedin: {
    in: ["body"],
    optional: true,
    trim: true,
    isURL: {
      errorMessage: "must be URL",
    },
  },
});

const aboutValidation = checkSchema({
  longDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  longDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  shortDescAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  shortDescEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  shortBriefAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },
  shortBriefEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 2 },
      errorMessage: " minimum 2 char",
    },
  },

  visionAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  visionEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  missionAr: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },
  missionEn: {
    in: ["body"],
    optional: true,
    trim: true,
    isLength: {
      options: { min: 10 },
      errorMessage: " minimum 10 char",
    },
  },

  numYearsExperience: {
    in: ["body"],
    optional: true,
    trim: true,
  },
  numSatisfiedClients: {
    in: ["body"],
    optional: true,
    trim: true,
  },
  numDeliveredProjects: {
    in: ["body"],
    optional: true,
    trim: true,
  },
  clientsRating: {
    in: ["body"],
    optional: true,
    trim: true,
  },
});
module.exports = { settingsValidation, aboutValidation };
