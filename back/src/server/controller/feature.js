const { Service , Features } = require("../../models");
const { Op, where } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { notFoundData } = require("../../constant/errors");




const getAllFeaturess = controllerWrapper(async (req, res, next) => {
    const { serviceId } = req.params;

    const service = await Service.findOne({where:{id:serviceId}});

    if (!service)
      throw createAppError("service not found", HttpStatus.NotFound, notFoundData);


  const data = await Features.findAll({where:{serviceId}});

  if (!data)
    throw createAppError("Features not found", HttpStatus.NotFound, notFoundData);


  successResponse(res, data, 200);
});


const addFeatures = controllerWrapper(async (req, res, next) => {
    const { serviceId } = req.params;


    const service = await Service.findOne({where:{id:serviceId}});

    if (!service)
      throw createAppError("service not found", HttpStatus.NotFound, notFoundData);

  const {
    nameAr,
    nameEn,
    descAr,
    descEn,
  } = req.body;


  await validationChecker(req, res);


  const addedFeaures = await Features.create({
    serviceId,
    nameAr,
    nameEn,
    descAr,
    descEn,
  });
  successResponse(res, addedFeaures, 201);
});


const deleteFeatures = controllerWrapper(async (req, res, next) => {
  const { id , serviceId } = req.params;

  const service = await Service.findOne({ where: { id : serviceId } });
  
  if (!service)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );

    const data = await Features.findOne({ where: { id , serviceId } });


  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const updateFeatures = controllerWrapper(async (req, res, next) => {
  const { id , serviceId } = req.params;

  const {
    nameAr,
    nameEn,
    descAr,
    descEn,

  } = req.body;
  await validationChecker(req, res);

  const service = await Service.findOne({ where: { id:serviceId } });
  if (!service)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );


  const data = await Features.findOne({ where: { serviceId , id } });
  if (!data)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );



  nameAr && (data.nameAr = nameAr);
  nameEn && (data.nameEn = nameEn);
  descAr && (data.descAr = descAr);
  descEn && (data.descEn = descEn);


  const savedData = await data.save();


  successResponse(res, savedData);
});

module.exports = {
  addFeatures,
  getAllFeaturess,
  deleteFeatures,
  updateFeatures,
};