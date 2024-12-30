const { Settings ,Achievement } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { notFoundData } = require("../../constant/errors");
const clearImage = require("../utils/clearImage");
const path = require("path");



const getAboutUs = controllerWrapper(async (req, res, next) => {

  const fromPanel = req.query.panel
  let aboutGroup = [
    "shortDescAr",
    "shortDescEn",
    "longDescAr",
    "longDescEn",
    "shortBriefAr",
    "shortBriefEn",
    "visionAr",
    "missionAr",
    "visionEn",
    "missionEn",
    "numYearsExperience",
    "numSatisfiedClients",
    "numDeliveredProjects",
    "clientsRating",
    "aboutBanner",
    "aboutImgOne",
    "aboutImgTwo",
    "aboutImgThree",
    "aboutImgFour",
    "homeImgOne",
    "homeImgTwo",
    "homeImgThree",
    "homeImgFour",

  ];



  const imagesKeys = [
    "aboutBanner",
    "homeImgOne",
    "homeImgTwo",
    "homeImgThree",
    "homeImgFour",
    "aboutImgOne",
    "aboutImgTwo",
    "aboutImgThree",
    "aboutImgFour",
  ];

  const data = await Settings.findAll({
    attributes: ["key", "value"],
    where: {
      key: aboutGroup,
    },
  });

  const handeledData = data.reduce((acc, curr) => {
    let val;
    for (let index = 0; index < imagesKeys.length; index++) {
      if (imagesKeys[index] == curr.key && curr.value) {
        val = `/u/about/${curr.value}`;
        break;
      } else val = curr.value;
    }

    acc[curr.key] = val;
    return acc;
  }, {});





  const achievement = await Achievement.findAll({    attributes: ["year", "descAr" ,"descEn"],  });

  handeledData.achievement = achievement




  return successResponse(res, handeledData );
});




const updateAbout = controllerWrapper(async (req, res, next) => {
  await validationChecker(req, res);
  const imges = req.files || "";

  const savedImges = await Settings.findAll({
    attributes: ["key", "value"],
    where: {
      key: [
        "aboutBanner",
        "homeImgOne",
        "homeImgTwo",
        "homeImgThree",
        "homeImgFour",
        "aboutImgOne",
        "aboutImgTwo",
        "aboutImgThree",
        "aboutImgFour",
      ],
    },
  });

  const currentSavedImages = savedImges.length
    ? savedImges?.filter((item) => {
        return item.dataValues.value;
      })
    : [];

  const aboutGroup = [
    "shortDescAr",
    "shortDescEn",
    "longDescAr",
    "longDescEn",
    "shortBriefAr",
    "shortBriefEn",
    "visionAr",
    "missionAr",
    "visionEn",
    "missionEn",
    "numYearsExperience",
    "numSatisfiedClients",
    "numDeliveredProjects",
    "clientsRating",
  ];

  const keysToUpdate = Object.keys(req.body).filter((key) =>
    aboutGroup.includes(key)
  );

  if (keysToUpdate.length === 0 && !imges) {
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

  if (imges) {
    const uploadedImgsKeysArr = Object.keys(imges);

    uploadedImgsKeysArr.forEach((key) => {
      currentSavedImages.forEach((item) => {
        if (key == item?.dataValues?.key) {
          const filePath = path.join(
            __dirname,
            "..",
            "..",
            "..",
            "uploads",
            "about",
            item.dataValues?.value
          );
          clearImage(filePath);
        }
      });

      keysToUpdate.push(key);
      updates.push({ key, value: imges?.[key]?.[0]?.filename });
    });
  }

  await Settings.destroy({ where: { key: keysToUpdate } });
  await Settings.bulkCreate(updates);

  getAboutUs(req, res, next);
});







const addAchevement = controllerWrapper(async (req, res, next) => {
    const { year, descAr, descEn } = req.body;  
    await validationChecker(req, res);
  
  
    const addAchevement = await Achievement.create({ year, descAr, descEn });
      successResponse(res, addAchevement, 201);
  
  });
  const updateAchevement = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { year, descAr, descEn } = req.body;  
    await validationChecker(req, res);
  
    const data = await Achievement.findOne({ where: { id } });
  
    if (!data)
    //   throw createAppError(" the achievements data not found ", HttpStatus.NotFound, notFoundData);
    throw createAppError(" this achievements' data is not found ", HttpStatus.NotFound, notFoundData);
  

  
  
    year && (data.year = year);
    descAr && (data.descAr = descAr);
    descEn && (data.descEn = descEn);
  
  
    const savedData = await data.save();  
    successResponse(res, savedData);
  });
  
  const deleteAchevement = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;
  
    const data = await Achievement.findOne({ where: { id } });
    if (!data)
      throw createAppError("This Achievement was not found", HttpStatus.NotFound, notFoundData);

    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);
  });
  



  

module.exports = {

updateAchevement,
  getAboutUs,
  updateAbout,
  updateAchevement,
  deleteAchevement,
  addAchevement


};
