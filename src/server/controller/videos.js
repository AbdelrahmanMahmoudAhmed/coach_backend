const {  Video } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllVideos = controllerWrapper(async (req, res, next) => {
    const data = await Video.findAll();
    successResponse(res, data);
});


const addVideo = controllerWrapper(async (req, res, next) => {
    const { titleAr, titleEn, descriptionAr, descriptionEn, link } = req.body;
    if (!req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
    await validationChecker(req, res);

    const videoRq = await Video.create({ titleAr, titleEn, descriptionAr, descriptionEn, link });
    successResponse(res, videoRq, 201);
});


const deleteVideo = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;



    const data = await Video.findOne({ where: { id } });

    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 100);

    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);

});






const updateVideo = controllerWrapper(async (req, res, next) => {
    const { id } = req.params;

    const { titleAr, titleEn, descriptionAr, descriptionEn, link } = req.body;

    await validationChecker(req, res);

    const data = await Video.findOne({ where: { id } });
    if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 1);

    titleAr && (data.titleAr = titleAr);
    titleEn && (data.titleEn = titleEn);
    descriptionAr && (data.descriptionAr = descriptionAr);
    descriptionEn && (data.descriptionEn = descriptionEn);
    link && (data.link = link);

    const savedData = await data.save();

    successResponse(res, savedData);

});

module.exports = {
    addVideo,
    getAllVideos,
    deleteVideo,
    updateVideo,
};
