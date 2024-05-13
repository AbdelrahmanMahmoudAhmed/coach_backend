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
    successResponse(res, data);
});
const addSections = controllerWrapper(async (req, res, next) => {


    console.log("adding___________________________________")

    const { nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction } = req.body;
    const image = req.file?.filename;

    const requestedSection = { image, nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction }

    await validationChecker(req, res);

    const sectionReq = await Section.create(requestedSection);
    successResponse(res, sectionReq, 201);
});
const deleteSections = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;

    const data = await Section.findOne({ where: { id } });
    if (!data) throw createAppError("This section was not found", HttpStatus.NotFound, 100);

    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});
const updateSections = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;
    const { nameAr, nameEn, titleAr, titleEn, contentAr, contentEn, link, callToAction } = req.body;
    const image = req.file?.filename;
    await validationChecker(req, res);



    const data = await Section.findOne({ where: { id } });
    console.log("data" , data.dataValues.image)
    if(image){

        const filePath = path.join(__dirname ,".." , ".." ,"..","uploads" , "section", data.dataValues.image)
         clearImage(filePath)
    }
    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 1);

    // image && (data.image = image);
    // nameAr && (data.nameAr = nameAr);
    // nameEn && (data.nameEn = nameEn);
    // titleAr && (data.titleAr = titleAr);
    // titleEn && (data.titleEn = titleEn);
    // contentAr && (data.contentAr = contentAr);
    // contentEn && (data.contentEn = contentEn);
    // link && (data.link = link);
    // callToAction && (data.callToAction = callToAction);

    // const savedData = await data.save();

    // successResponse(res, savedData);

});


module.exports = {
    addSections,
    getAllSections,
    deleteSections,
    updateSections,
};
