const { Transformation  } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

const getAllTransformations = controllerWrapper(async (req, res, next) => {
  const data = await Transformation.findAll();
  successResponse(res, data);
});


const addTransformation = controllerWrapper(async (req, res, next) => {
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
  if(!image){
    throw createAppError("image is required", HttpStatus.BadRequest, 5);
  }
  const requestedTransformation = {
    image ,
    descriptionAr,
    descriptionEn
  }

  await validationChecker(req, res);

  const transformationsReq = await Transformation.create(requestedTransformation);
  successResponse(res, transformationsReq, 201);
});


const deleteTransformation = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Transformation.findOne({ where: { id } });
  if (data) {
    const deletedItemData = await data.destroy();
    successResponse(res, deletedItemData);
  } else {
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);
  }
});


const updateTransformation = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
console.log("image >>> " , image)
  await validationChecker(req, res);

  const data = await Transformation.findOne({ where: { id } });
  if (data) {
    image && (data.image = image);
    descriptionAr && (data.descriptionAr = descriptionAr);
    descriptionEn && (data.descriptionEn = descriptionEn);

    const savedData = await data.save();

    successResponse(res, savedData);
  } else {
    throw createAppError("This item was not found", HttpStatus.NotFound, 1);
  }
});

module.exports = {
  addTransformation,
  getAllTransformations,
  deleteTransformation,
  updateTransformation,
};
