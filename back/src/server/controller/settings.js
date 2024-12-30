const { Settings , Service , Project , Feedback } = require("../../models");
const { Op , Sequelize } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { notFoundData } = require("../../constant/errors");
const clearImage = require("../utils/clearImage");
const path = require("path");






const getPanelSettings = controllerWrapper(async (req, res, next) => {
  const keysToFetch = [
    "heroDescAr",
    "heroDescEn",
    "chooseUsFirstTitleAr",
    "chooseUsFirstTitleEn",
    "chooseUsFirstDescAr",
    "chooseUsFirstDescEn",
    "chooseUsSecondTitleAr",
    "chooseUsSecondTitleEn",
    "chooseUsSecondDescAr",
    "chooseUsSecondDescEn",
    "chooseUsThirdTitleAr",
    "chooseUsThirdTitleEn",
    "chooseUsThirdDescAr",
    "chooseUsThirdDescEn",
    "footerContentAr",
    "footerContentEn",
    "phone",
    "email",
    "contactEmail",
    "firstBranch",
    "secondBranch",
    "policyAr",
    "policyEn",
    "termsAr",
    "termsEn",
    "facebook",
    "linkedin",
    "keyWordsAr",
    "keyWordsEn",
    "titleAr",
    "descriptionAr",
    "titleEn",
    "descriptionEn",
    "servicesVideo",
  ];

  
  const data = await Settings.findAll({
    attributes: ["key", "value", "updatedAt"],
    where: {
      key: keysToFetch, // Match rows where `key` is in the `keysToFetch` array
    },
  });

  const handeledData = data.reduce((acc, curr) => {
    
  
    acc[curr.key] =  (curr?.key == "servicesVideo" && curr.value) ?  `/u/settings/${curr.value}` : curr.value;
    return acc;
  }, {});

  return successResponse(res, handeledData);
});



const updateSettings = controllerWrapper(async (req, res, next) => {
  await validationChecker(req, res);
  const video = req.file?.filename || "";

  const savedVideo = await Settings.findOne({
    attributes: ["key", "value"],
    where: {
      key: "servicesVideo",
    },
  });

  // Define the allowed keys
  const allowedKeys = [
    "heroDescAr",
    "heroDescEn",
    "chooseUsFirstTitleAr",
    "chooseUsFirstTitleEn",
    "chooseUsFirstDescAr",
    "chooseUsFirstDescEn",
    "chooseUsSecondTitleAr",
    "chooseUsSecondTitleEn",
    "chooseUsSecondDescAr",
    "chooseUsSecondDescEn",
    "chooseUsThirdTitleAr",
    "chooseUsThirdTitleEn",
    "chooseUsThirdDescAr",
    "chooseUsThirdDescEn",
    "footerContentAr",
    "footerContentEn",
    "phone",
    "email",
    "contactEmail",
    "firstBranch",
    "secondBranch",
    "policyAr",
    "policyEn",
    "termsAr",
    "termsEn",
    "facebook",
    "linkedin",
    "keyWordsAr",
    "keyWordsEn",
        "titleAr",
    "descriptionAr",
    "titleEn",
    "descriptionEn",
    "servicesVideo",
  ];

  // Filter keys to include only allowed keys
  const keysToUpdate = Object.keys(req.body).filter((key) =>
    allowedKeys.includes(key)
  );

  if (keysToUpdate.length === 0 && !video) {
    throw createAppError(
      "No valid keys provided for update",
      HttpStatus.BadRequest,
      notFoundData
    );
  }

  const updates = keysToUpdate.map((key) => ({
    key,
    value: req.body[key],
  }));
  // to delete the image if there is a new one
  if (video) {
    if (savedVideo.dataValues?.value) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "uploads",
        "settings",
        savedVideo.dataValues?.value
      );
      clearImage(filePath);
    }
    keysToUpdate.push("servicesVideo");
    updates.push({ key: "servicesVideo", value: video });
  }

  await Settings.destroy({ where: { key: keysToUpdate } });
  await Settings.bulkCreate(updates);

  // Fetch and return updated data
  getPanelSettings(req, res, next);
});

const updateLayout = controllerWrapper(async (req, res, next) => {
  // start validate
  await validationChecker(req, res);

  const keysToUpdate = Object.keys(req.body); // the keys for only updated values

  // to get only updated values with its keys .
  const updates = [];
  keysToUpdate.forEach((item) => {
    updates.push({ key: item, value: req.body[item] });
  });

  await Settings.destroy({ where: { key: keysToUpdate } }); // delete the old records witch that has a new value
  await Settings.bulkCreate(updates); // create all new values

  getPanelSettings(req, res, next);
});


const getTerms = controllerWrapper(async (req, res, next) => {
    const data = await Settings.findAll({
      attributes: ["key", "value" , "updatedAt"],
      where: {
        key: [
          "termsAr",
          "termsEn",
 
        ],
      },
    });
    const terms = data.reduce((acc, curr) => {
        acc[curr.key] =  { value : curr.value , lastUpdate : curr.updatedAt };
        return acc;
      }, {});

    return successResponse(res, terms);
  });
  const getPolicy = controllerWrapper(async (req, res, next) => {
    const data = await Settings.findAll({
      attributes: ["key", "value" , "updatedAt"],
      where: {
        key: [
          "policyAr",
          "policyEn",
 
        ],
      },
    });
    const terms = data.reduce((acc, curr) => {
        acc[curr.key] =  { value : curr.value , lastUpdate : curr.updatedAt };
        return acc;
      }, {});

    return successResponse(res, terms);
  });

  const getLayout = controllerWrapper(async (req, res, next) => {
    const data = await Settings.findAll({
      attributes: ["key", "value" , "updatedAt"],
      where: {
        key: [
          "footerContentAr",
          "footerContentEn",
          "phone",
          "email",
          "contactEmail",
          "firstBranch",
          "secondBranch",
          "facebook",
          "linkedin",
          "keyWordsAr",
          "keyWordsEn",          "titleAr",
          "titleEn",
          "descriptionAr",
          "descriptionEn",
 
        ],
      },
    });
    const layoutData = data.reduce((acc, curr) => {
        acc[curr.key] =  curr.value ;
        return acc;
      }, {});

    return successResponse(res, layoutData);
  });

  const getHomePage = controllerWrapper(async (req, res, next) => {
    const data = await Settings.findAll({
      attributes: ["key", "value" , "updatedAt"],
      where: {
        key: [
          "heroDescAr",
          "heroDescEn",

          "numYearsExperience",
          "numSatisfiedClients",
          "numDeliveredProjects",
          "clientsRating",

          "longDescAr",
          "longDescEn",

          "chooseUsFirstTitleAr",
          "chooseUsFirstTitleEn",
          "chooseUsFirstDescAr",
          "chooseUsFirstDescEn",
          "chooseUsSecondTitleAr",
          "chooseUsSecondTitleEn",
          "chooseUsSecondDescAr",
          "chooseUsSecondDescEn",
          "chooseUsThirdTitleAr",
          "chooseUsThirdTitleEn",
          "chooseUsThirdDescAr",
          "chooseUsThirdDescEn",

          "homeImgOne",
          "homeImgTwo",
          "homeImgThree",
          "homeImgFour",

 
        ],
      },
    });
    const homeData = data.reduce((acc, curr) => {
        const imgs = [      "homeImgOne",  "homeImgTwo","homeImgThree","homeImgFour",]

        if( imgs.includes(curr.key) && curr.value){
          acc[curr.key] =  `/u/about/${curr.value}` ;
        } else{
          acc[curr.key] =  curr.value ;
        }
        return acc;
      }, {});

      const services = await Service.findAll({
        attributes: ["id", "nameAr", "nameEn" ],
      });
      const projects = await Project.findAll({
        where:{displayInHome: true},

        attributes: [
          "id",
          "nameAr",
          "nameEn",
          "longDescAr",
          "longDescEn",
           "color",
                     [
            Sequelize.literal(`
              CASE 
                WHEN \`homeImg\` IS NOT NULL AND \`homeImg\` != '' THEN CONCAT('/u/project/', \`homeImg\`)
                ELSE NULL
              END
            `),
            'homeImg', 
          ],
         ],
      });
      const feedbacks = await Feedback.findAll({ 
        attributes: [
          "id",
          "name",
          "jobTitle",
          "desc",
          [ 
          Sequelize.literal(`
            CASE 
              WHEN \`img\` IS NOT NULL AND \`img\` != '' THEN CONCAT('/u/feedback/', \`img\`)
              ELSE NULL
            END
          `),
          'img', 
          ]
        ],

        where:{projectId: null}
      });

      homeData.services = services;
      homeData.projects = projects;
      homeData.feedbacks = feedbacks;


    return successResponse(res, homeData);
  });

  
  

module.exports = {
  getLayout,
  updateLayout,
  getPanelSettings,
  updateSettings,

  getTerms,
  getPolicy,

  getHomePage
};
