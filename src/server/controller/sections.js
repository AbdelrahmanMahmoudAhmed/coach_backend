const { Transformation, Section } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const path = require('path')
const clearImage = require('../utils/clearImage')


const getAllSections = controllerWrapper(async (req, res, next) => {
    const data = await Section.findAll();
    const dataWithImagePath = data.map((item) => {
        item.image &&( item.image = `/u/section/${item.image}`);
        return item;
      });
      
    successResponse(res, dataWithImagePath);
});
const addSections = controllerWrapper(async (req, res, next) => {



    const { nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction , callToActionLink } = req.body;
    const image = req.file?.filename;

    const requestedSection = { image, nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction , callToActionLink }

    await validationChecker(req, res);

    const sectionReq = await Section.create(requestedSection);
    successResponse(res, sectionReq, 201);
});
const deleteSections = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;

    const data = await Section.findOne({ where: { id } });
    if (!data) throw createAppError("This section was not found", HttpStatus.NotFound, 100);

  // to delete the image when the section item
  const filePath = path.join(__dirname, "..", "..", "..", "uploads", "section", data.dataValues.image)
  clearImage(filePath)
    // delete from the db
    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});
const updateSections = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction , callToActionLink } = req.body;
    const image = req.file?.filename;
    await validationChecker(req, res);



    const data = await Section.findOne({ where: { id } });

    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 1);

    if(image){ // to delete the old image to replace it with the new one

        const filePath = path.join(__dirname ,".." , ".." ,"..","uploads" , "section", (data.dataValues.image || '')) || ''
        filePath && clearImage(filePath)
    }


    image && (data.image = image);
    nameAr && (data.nameAr = nameAr);
    nameEn && (data.nameEn = nameEn);
    titleAr && (data.titleAr = titleAr);
    titleEn && (data.titleEn = titleEn);
    contentAr && (data.contentAr = contentAr);
    contentEn && (data.contentEn = contentEn);
    link && (data.link = link);
    callToAction && (data.callToAction = callToAction);
    data.callToActionLink = callToActionLink;
     

    const savedData = await data.save();

    successResponse(res, savedData);

});


module.exports = {
    addSections,
    getAllSections,
    deleteSections,
    updateSections,
};
