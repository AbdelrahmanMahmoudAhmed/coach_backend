const { Transformation } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");


const path = require('path')
const clearImage = require('../utils/clearImage')
const getAllTransformations = controllerWrapper(async (req, res, next) => {
  const data = await Transformation.findAll();

  const dataWithImagePath = data.map((item) => {
    item.image = `/u/transformation/${item.image}`;
    return item;
  });

  successResponse(res, dataWithImagePath);
});


const addTransformation = controllerWrapper(async (req, res, next) => {
  
  if (!req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
  if (!image) {
    throw createAppError("image is required", HttpStatus.BadRequest, 5);
  }
  const requestedTransformation = {
    image,
    descriptionAr,
    descriptionEn
  }

  await validationChecker(req, res);

  const transformationsReq = await Transformation.create(requestedTransformation);
  successResponse(res, transformationsReq, 201);
});


const deleteTransformation = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!req.auth.allowDelete) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);

  const data = await Transformation.findOne({ where: { id } });
  if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 100);

  // to delete the image when the transformation item
  const filePath = path.join(__dirname, "..", "..", "..", "uploads", "transformation", data.dataValues.image)
  clearImage(filePath)
  // delete from the db
  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);

});


const updateTransformation = controllerWrapper(async (req, res, next) => {
  if (!req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);

  const { id } = req.params;
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
  await validationChecker(req, res);

  const data = await Transformation.findOne({ where: { id } });
  if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 1);

  if (image) { // to delete the old image to replace it with the new one

    const filePath = path.join(__dirname, "..", "..", "..", "uploads", "transformation", data.dataValues.image)
    clearImage(filePath)
  }



  image && (data.image = image);
  descriptionAr && (data.descriptionAr = descriptionAr);
  descriptionEn && (data.descriptionEn = descriptionEn);
  const savedData = await data.save();

  successResponse(res, savedData);

});

module.exports = {
  addTransformation,
  getAllTransformations,
  deleteTransformation,
  updateTransformation,
};
