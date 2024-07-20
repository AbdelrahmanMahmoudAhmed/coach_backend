const { Blog } = require("../../models");
const { Op } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const path = require("path");
const clearImage = require("../utils/clearImage");

const getSingleBlog = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Blog.findOne({ where: { id } });

  if (!data)
    throw createAppError("This Blogs was not found", HttpStatus.NotFound, 100);
  data.image && (data.image = `/u/blog/${data.image}`);
  successResponse(res, data);
});
const getAllBlogs = controllerWrapper(async (req, res, next) => {
    /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await Blog.count({
    where: {
      [Op.or]: [
        { titleAr: { [Op.like]: `%${searchTerm}%` } },
        { titleEn: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });
  /* ------------------------------- END ------------------------------- */
  const data = await Blog.findAll({
    where: {
      [Op.or]: [
        { titleAr: { [Op.like]: `%${searchTerm}%` } },
        { titleEn: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    
    limit: perPage,
    offset,
  });

  const dataWithImagePath = data.map((item) => {
    item.image  && (item.image = `/u/blog/${item.image}`);
    return item;
  });


  successResponse(res, dataWithImagePath, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

const addBlog = controllerWrapper(async (req, res, next) => {
  const { titleAr, titleEn, contentAr, contentEn, type, link } = req.body;
  const image =  type == "pic" ? req.file?.filename : null;


  const requestedCertification = {
    titleAr,
    titleEn,
    contentAr,
    contentEn,
    type,
    link :  type == "video" ? link : null,
  };
  type == "pic" && image
    ? (requestedCertification.image = image)
    : (requestedCertification.image = null);

  // to delete the image witch was add from the form data middleware if the type was video
  if (req.file?.filename && type != "pic") {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "blog",
      req.file?.filename
    );

    clearImage(filePath);
  }
  await validationChecker(req, res);
  const certificationReq = await Blog.create(requestedCertification);
  successResponse(res, certificationReq, 201);
});



const deleteBlog = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Blog.findOne({ where: { id } });
  if (!data)
    throw createAppError("This Blogs was not found", HttpStatus.NotFound, 100);
  // to delete the image when the blog item
  if (data.dataValues.image) {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "blog",
      data.dataValues.image
    );
    clearImage(filePath);
  }

  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const updateBlog = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const { titleAr, titleEn, contentAr, contentEn, type, link } = req.body;
  let image = type == "pic" ? req.file?.filename : null;
  await validationChecker(req, res);

  const data = await Blog.findOne({ where: { id } });

  if (!data)
    throw createAppError("This Blog was not found", HttpStatus.NotFound, 1);

  // to delete the image if there is a new one
  if (
    (req.file?.filename && data.dataValues.image) ||
    (type != "pic" && data.dataValues.image)
  ) {
    // to delete the old image to replace it with the new one
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "blog",
      data.dataValues.image
    );
    clearImage(filePath);
  }

  if( type != 'pic'){
    image = null
  }else if (image && type == 'pic'){
    data.image = image
  }

  if( type != 'video')  data.link = null;

  // to delete the image witch was add from the form data middleware if the type was video
  if (req.file?.filename && type != "pic") {
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "uploads",
      "blog",
      req.file?.filename
    );
    clearImage(filePath);
  }
  console.log('data.image' , data.image)
  data.image = image;
  titleAr && (data.titleAr = titleAr);
  titleEn && (data.titleEn = titleEn);
  contentAr && (data.contentAr = contentAr);
  contentEn && (data.contentEn = contentEn);
  type && (data.type = type);
  link && (data.link = link);

  const savedData = await data.save();

  successResponse(res, savedData);
});

module.exports = {
  addBlog,
  getAllBlogs,
  deleteBlog,
  updateBlog,
  getSingleBlog,
};
