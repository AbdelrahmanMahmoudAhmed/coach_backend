const { Section, Certification } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const path = require('path')
const clearImage = require('../utils/clearImage')


const getCertification = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await Certification.findOne({ where: { id } });
    if (!data) throw createAppError("This Certifications was not found", HttpStatus.NotFound, 100);
    data.image &&( data.image = `/u/certification/${data.image}`);
    successResponse(res, data);
});
const getAllCertifications = controllerWrapper(async (req, res, next) => {
    const data = await Certification.findAll();
    const dataWithImagePath = data.map((item) => {
        item.image &&( item.image = `/u/certification/${item.image}`);
        return item;
      });
    successResponse(res, dataWithImagePath);
});
const addCertifications = controllerWrapper(async (req, res, next) => {



    const { titleAr, titleEn, contentAr, contentEn, } = req.body;
    const image = req.file?.filename;

    const requestedCertification = { image, titleAr, titleEn, contentAr, contentEn, }

    await validationChecker(req, res);

    const certificationReq = await Certification.create(requestedCertification);
    successResponse(res, certificationReq, 201);
});
const deleteCertifications = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;

    const data = await Certification.findOne({ where: { id } });
    if (!data) throw createAppError("This Certifications was not found", HttpStatus.NotFound, 100);

    // to delete the image when the certification item
    const filePath = path.join(__dirname, "..", "..", "..", "uploads", "certification", data.dataValues.image)
    clearImage(filePath)


    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});
const updateCertifications = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;

    const { titleAr, titleEn, contentAr, contentEn, } = req.body;

    const image = req.file?.filename;
    await validationChecker(req, res);



    const data = await Certification.findOne({ where: { id } });

    if (!data) throw createAppError("This Certification was not found", HttpStatus.NotFound, 1);

    if (image) { // to delete the old image to replace it with the new one

        const filePath = path.join(__dirname, "..", "..", "..", "uploads", "certification", data.dataValues.image)
        clearImage(filePath)
    }


    image && (data.image = image);
    titleAr && (data.titleAr = titleAr);
    titleEn && (data.titleEn = titleEn);
    contentAr && (data.contentAr = contentAr);
    contentEn && (data.contentEn = contentEn);


    const savedData = await data.save();

    successResponse(res, savedData);

});


module.exports = {
    addCertifications,
    getAllCertifications,
    deleteCertifications,
    updateCertifications,
    getCertification
};
