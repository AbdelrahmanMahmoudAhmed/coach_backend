const { Service  , ProjectService, Project, Settings, Features } = require("../../models");
const { Op , Sequelize } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const path = require("path");
const { notFoundData ,requiredImg , serverErr} = require("../../constant/errors");
const clearImage = require("../utils/clearImage");

const getFilePath = (fileName) => {
  return path.join(__dirname, "..", "..", "..", "uploads", "service", fileName);
};


const getWebsiteServices = controllerWrapper(async (req, res, next) => {


  try{
  const data = await Service.findAll({
    attributes:["id","nameAr","nameEn","mainDescAr","mainDescEn","isCommingSoon",       [
      Sequelize.literal(`
        CASE 
          WHEN \`image\` IS NOT NULL AND \`image\` != '' THEN CONCAT('/u/service/', \`image\`)
          ELSE NULL
        END
      `),
      'image', 
    ],],

    include: [

 
      {
        model: Features,
        as: "features",
        attributes: ["id", "nameAr", "nameEn", "descAr", "descEn"],
      },
      {
        model: ProjectService,
        as: "projects",
        attributes:["serviceId"],
        include: [
          {
            model: Project,
            as: "project",
            attributes: [
              "id",
              "nameAr",
              "nameEn",
              "longDescAr",
              "longDescEn",
    
              [
                Sequelize.literal(`
                  CASE 
                    WHEN \`serviceImg\` IS NOT NULL AND \`serviceImg\` != '' THEN CONCAT('/u/project/', \`serviceImg\`)
                    ELSE NULL
                  END
                `),
                'serviceImg', 
              ],

            ],
          },
        ],
      },

  
    ],
  });

  if (!data)
    throw createAppError(" not found", HttpStatus.NotFound, notFoundData);

  const getServicesVideo = await Settings.findOne({
    attributes: ["key", "value"],
    where: {
      key: "servicesVideo",
    },
  });
  const wholeData = { servicesVideo : getServicesVideo?.value || "" , servicesData :data}
  successResponse(res, wholeData, 200);

}catch(err){
  throw createAppError(" not found", HttpStatus.InternalServerError, serverErr);
}
});
const getSingleService = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = await Service.findOne({ where: { id } });

  if (!data)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );
    data.image && (data.image = `/u/service/${data.image}`);
    data.iconLight && (data.iconLight = `/u/service/${data.iconLight}`);
    data.iconDark && (data.iconDark = `/u/service/${data.iconDark}`);
  successResponse(res, data);
});
const getAllServices = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */
  // pagination
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Service.count();
  /* ------------------------------- END ------------------------------- */
  const data = await Service.findAll({
    limit: perPage,
    offset,
  });

  if (!data)
    throw createAppError(" not found", HttpStatus.NotFound, notFoundData);

  const dataWithImagePath = data.map((item) => {
    item.image && (item.image = `/u/service/${item.image}`);
    item.iconLight && (item.iconLight = `/u/service/${item.iconLight}`);
    item.iconDark && (item.iconDark = `/u/service/${item.iconDark}`);
    return item;
  });
  successResponse(res, dataWithImagePath, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});
const addService = controllerWrapper(async (req, res, next) => {
  const {
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    mainDescAr,
    mainDescEn,
    isCommingSoon,
  } = req.body;
  const allImgs = req.files || [];
  const image = allImgs?.image?.[0]?.filename || "";
  const iconDark = allImgs?.iconDark?.[0]?.filename || "";
  const iconLight = allImgs?.iconLight?.[0]?.filename || "";

  if(Object.keys(allImgs)?.length != 3 ){
    throw createAppError('all images are required', HttpStatus.BadRequest, requiredImg);
  }

  await validationChecker(req, res);

  // throw new Error('hello')

  const addedService = await Service.create({
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    mainDescAr,
    mainDescEn,
    isCommingSoon,
    image,
    iconDark,
    iconLight,
  });
  successResponse(res, addedService, 201);
});
const deleteService = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;

  const data = await Service.findOne({ where: { id } });
  
  if (!data)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );
  // to delete the images
  if (data.dataValues.image) clearImage(getFilePath(data.dataValues.image));
  if (data.dataValues.iconDark)
    clearImage(getFilePath(data.dataValues.iconDark));
  if (data.dataValues.iconLight)
    clearImage(getFilePath(data.dataValues.iconLight));

  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});
const updateService = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const allImgs = req.files || [];
  const image = allImgs?.image?.[0]?.filename || "";
  const iconDark = allImgs?.iconDark?.[0]?.filename || "";
  const iconLight = allImgs?.iconLight?.[0]?.filename || "";
  const {
    nameAr,
    nameEn,
    shortDescAr,
    shortDescEn,
    mainDescAr,
    mainDescEn,
    isCommingSoon,
  } = req.body;
  await validationChecker(req, res);

  const data = await Service.findOne({ where: { id } });

  if (!data)
    throw createAppError(
      "This Service was not found",
      HttpStatus.NotFound,
      notFoundData
    );

  if (image && data.dataValues.image) {
    clearImage(getFilePath(data.dataValues.image));

    data.image = image;
  }
  if (iconDark && data.dataValues.iconDark) {
    clearImage(getFilePath(data.dataValues.iconDark));

    data.iconDark = iconDark;
  }
  if (iconLight && data.dataValues.iconLight) {
    clearImage(getFilePath(data.dataValues.iconLight));

    data.iconLight = iconLight;
  }

  nameAr && (data.nameAr = nameAr);
  nameEn && (data.nameEn = nameEn);
  shortDescAr && (data.shortDescAr = shortDescAr);
  shortDescEn && (data.shortDescEn = shortDescEn);
  mainDescAr && (data.mainDescAr = mainDescAr);
  mainDescEn && (data.mainDescEn = mainDescEn);
  isCommingSoon && (data.isCommingSoon = isCommingSoon);

  const savedData = await data.save();

  savedData.image = `/u/service/${savedData.image}`;
  savedData.iconLight = `/u/service/${savedData.iconLight}`;
  savedData.iconDark = `/u/service/${savedData.iconDark}`;

  successResponse(res, savedData);
});

module.exports = {
  addService,
  getAllServices,
  deleteService,
  updateService,
  getSingleService,
  getWebsiteServices
};
