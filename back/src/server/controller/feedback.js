const { Feedback } = require("../../models");
const { Op } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const path = require("path");
const { notFoundData } = require("../../constant/errors")
const clearImage = require("../utils/clearImage");






const getSingleFeedback = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Feedback.findOne({ where: { id ,projectId: null} });

  if (!data)
    throw createAppError("This Feedback was not found", HttpStatus.NotFound, notFoundData);
  successResponse(res, data);
});


const getAllFeedbacks = controllerWrapper(async (req, res, next) => {
    /* ------------------------------- START ------------------------------- */
  // pagination
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Feedback.count();
  /* ------------------------------- END ------------------------------- */
  const data = await Feedback.findAll({ 
    limit: perPage,
    offset,
    where:{projectId: null}
  });

  if (!data)
    throw createAppError(" not found", HttpStatus.NotFound, notFoundData);

  const dataWithImagePath = data.map((item) => {
    item.img  && (item.img = `/u/feedback/${item.img}`);
    return item;
  });
  successResponse(res, dataWithImagePath, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

const addFeedback = controllerWrapper(async (req, res, next) => {
  const { name, jobTitle, desc } = req.body;
  const img =   req.file?.filename ||  "";

  await validationChecker(req, res);


  const addedFeedback = await Feedback.create({ name, jobTitle, desc, img });
    successResponse(res, addedFeedback, 201);

});

const deleteFeedback = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Feedback.findOne({ where: { id } });
  if (!data)
    throw createAppError("This feedback was not found", HttpStatus.NotFound, notFoundData);
  // to delete the image 
  if (data.dataValues.img) {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "feedback",
      data.dataValues.img
    );

  clearImage(filePath)

  }
  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const updateFeedback = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { name, jobTitle, desc } = req.body;
  const img =   req.file?.filename ||  "";
  await validationChecker(req, res);

  const data = await Feedback.findOne({ where: { id } });

  if (!data)
    throw createAppError("This feedback was not found", HttpStatus.NotFound, notFoundData);

  // to delete the image if there is a new one
  if (img && data.dataValues.img) {
    // to delete the old image to replace it with the new one
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "feedback",
      data.dataValues.img
    );
    clearImage(filePath)


    data.img = img

  }



  name && (data.name = name);
  jobTitle && (data.jobTitle = jobTitle);
  desc && (data.desc = desc);


  const savedData = await data.save();

  savedData.img = `/u/feedback/${savedData.img}`

  successResponse(res, savedData);
});

module.exports = {
  addFeedback,
  getAllFeedbacks,
  deleteFeedback,
  updateFeedback,
  getSingleFeedback,
};
