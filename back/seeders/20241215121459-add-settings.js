"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "settings",
      [
        // home page and layout
        {
          key: "heroDescAr",
          value: "",
        },
        {
          key: "heroDescEn",
          value: "",
        },
        {
          key: "chooseUsFirstTitleAr",
          value: "",
        },
        {
          key: "chooseUsFirstTitleEn",
          value: "",
        },
        {
          key: "chooseUsFirstDescAr",
          value: "",
        },
        {
          key: "chooseUsFirstDescEn",
          value: "",
        },
        {
          key: "chooseUsSecondTitleAr",
          value: "",
        },
        {
          key: "chooseUsSecondTitleEn",
          value: "",
        },
        {
          key: "chooseUsSecondDescAr",
          value: "",
        },
        {
          key: "chooseUsSecondDescEn",
          value: "",
        },
        {
          key: "chooseUsThirdTitleAr",
          value: "",
        },
        {
          key: "chooseUsThirdTitleEn",
          value: "",
        },
        {
          key: "chooseUsThirdDescAr",
          value: "",
        },
        {
          key: "chooseUsThirdDescEn",
          value: "",
        },
        {
          key: "footerContentAr",
          value: "",
        },
        {
          key: "footerContentEn",
          value: "",
        },
        {
          key: "phone",
          value: "",
        },
        {
          key: "email",
          value: "",
        },
        {
          key: "contactEmail",
          value: "",
        },



        {
          key: "firstBranch",
          value: "",
        },
        {
          key: "secondBranch",
          value: "",
        },
        {
          key: "policyAr",
          value: "",
        },
        {
          key: "policyEn",
          value: "",
        },
        {
          key: "termsAr",
          value: "",
        },
        {
          key: "termsEn",
          value: "",
        },
        {
          key: "facebook",
          value: "",
        },
        {
          key: "linkedin",
          value: "",
        },

        {
          key: "keyWordsAr",
          value: "",
        },
        {
          key: "keyWordsEn",
          value: "",
        },
        {
          key: "titleAr",
          value: "",
        },
        {
          key: "descriptionAr",
          value: "",
        },
        {
          key: "titleEn",
          value: "",
        },
        {
          key: "descriptionEn",
          value: "",
        },
        {
          key: "servicesVideo",
          value: "",
        },
        // about page
        {
          key: "shortDescAr",
          value: "",
        },
        {
          key: "shortDescEn",
          value: "",
        },
        {
          key: "longDescAr",
          value: "",
        },
        {
          key: "longDescEn",
          value: "",
        },
        {
          key: "shortBriefAr",
          value: "",
        },
        {
          key: "shortBriefEn",
          value: "",
        },
        {
          key: "visionAr",
          value: "",
        },
        {
          key: "missionAr",
          value: "",
        },
        {
          key: "visionEn",
          value: "",
        },
        {
          key: "missionEn",
          value: "",
        },
        {
          key: "numYearsExperience",
          value: "",
        },
        {
          key: "numSatisfiedClients",
          value: "",
        },
        {
          key: "numDeliveredProjects",
          value: "",
        },  
            {
          key: "clientsRating",
          value: "",
        },
        // imgs
        {
          key: "aboutBanner",
          value: "",
        },
        {
          key: "homeImgOne",
          value: "",
        },
        {
          key: "homeImgTwo",
          value: "",
        },
        {
          key: "homeImgThree",
          value: "",
        },
        {
          key: "homeImgFour",
          value: "",
        },
        {
          key: "aboutImgOne",
          value: "",
        },
        {
          key: "aboutImgTwo",
          value: "",
        },
        {
          key: "aboutImgThree",
          value: "",
        },
        {
          key: "aboutImgFour",
          value: "",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', null, {});

  },
};
