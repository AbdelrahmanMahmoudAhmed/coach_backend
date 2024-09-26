const { Testimonial } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");


const path = require('path');
const clearImage = require('../utils/clearImage');


// const getAllTestimonials = controllerWrapper(async (req, res, next) => {
//     /* ------------------------------- START ------------------------------- */
//   // pagination and search variables
//   const page = (req.query.page && !isNaN(+req.query.page)) ? +req.query.page : 1;
//   const perPage = 10;
//   const offset = (page - 1) * perPage
//   const totalCount = await Testimonial.count();
//   /* ------------------------------- END ------------------------------- */
//   const data = await Testimonial.findAll({limit: perPage, offset});


//   const dataWithImagePath = data.map((item) => {
//     item.image = `/u/testimonial/${item.image}`;
//     return item;
//   });

//   successResponse(res, dataWithImagePath ,200, [{ pagination: { currentPage: page, perPage, totalCount } }]);
// });

const getAllTestimonials = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */

const data = await Testimonial.findAll();
console.log("__________________________" , data)

const dataWithImagePath = data.map((item) => {
  item.image = `/u/testimonial/${item.image}`;
  return item;
});

successResponse(res, dataWithImagePath ,200);
});


const addTestimonial = controllerWrapper(async (req, res, next) => {
  
  if (!req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
  if (!image) {
    throw createAppError("image is required", HttpStatus.BadRequest, 5);
  }
  const requestedTestimonial = {
    image,
    descriptionAr,
    descriptionEn
  }

  await validationChecker(req, res);

  const testimonialsReq = await Testimonial.create(requestedTestimonial);
  successResponse(res, testimonialsReq, 201);
});


const deleteTestimonial = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  if (!req.auth.allowDelete) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);

  const data = await Testimonial.findOne({ where: { id } });
  if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 100);

  // to delete the image when the testimonial item
  const filePath = path.join(__dirname, "..", "..", "..", "uploads", "testimonial", data.dataValues.image || "")
  clearImage(filePath)
  // delete from the db
  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);

});


const updateTestimonial = controllerWrapper(async (req, res, next) => {
  if (!req.auth.allowEdit) throw createAppError("un Authorized", HttpStatus.Unauthorized, 5);

  const { id } = req.params;
  const { descriptionAr, descriptionEn } = req.body;
  const image = req.file?.filename;
  await validationChecker(req, res);

  const data = await Testimonial.findOne({ where: { id } });
  if (!data) throw createAppError("This item was not found", HttpStatus.NotFound, 1);

  if (image) { // to delete the old image to replace it with the new one

    const filePath = path.join(__dirname, "..", "..", "..", "uploads", "testimonial", data.dataValues.image)
    clearImage(filePath)
  }



  image && (data.image = image);
  descriptionAr && (data.descriptionAr = descriptionAr);
  descriptionEn && (data.descriptionEn = descriptionEn);
  const savedData = await data.save();

  successResponse(res, savedData);

});

module.exports = {
  addTestimonial,
  getAllTestimonials,
  deleteTestimonial,
  updateTestimonial,
};
