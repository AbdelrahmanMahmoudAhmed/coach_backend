const { Item, PackageFeature, Package } = require("../../models");
const { Op } = require("sequelize");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const path = require('path')
const clearImage = require('../utils/clearImage')



// get all packages with pagination
const getPackage = controllerWrapper(async (req, res, next) => {

  /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await Package.count({
    include: {
      model: Item,
      where: {
        [Op.or]: [
          { titleAr: { [Op.like]: `%${searchTerm}%` } },
          { titleEn: { [Op.like]: `%${searchTerm}%` } },
          { descriptionAr: { [Op.like]: `%${searchTerm}%` } },
          { descriptionEn: { [Op.like]: `%${searchTerm}%` } },
        ],
      },
    },

    // where: {
    //   [Op.or]: [{ period: { [Op.like]: `%${searchTerm}%` } }],
    // },
  });
  /* ------------------------------- END ------------------------------- */

  const data = await Package.findAll({
    
    include: [
      {
        // Notice `include` takes an ARRAY
        model: Item,
        where: {
          [Op.or]: [
            { titleAr: { [Op.like]: `%${searchTerm}%` } },
            { titleEn: { [Op.like]: `%${searchTerm}%` } },
            { descriptionAr: { [Op.like]: `%${searchTerm}%` } },
            { descriptionEn: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
      },
      {
        model: PackageFeature,
      }
    ],
    limit: perPage,
    offset,

  });


  const manipulatedData = data.map((package) => {
    let { id, image, ...rest } = package.dataValues.Item.dataValues;
    image = `/u/package/${image}`
    return {
      id: package.dataValues.id,
      image,
      ...rest,
      period: package.dataValues.period,
      itemId: package.dataValues.itemId,
      PackageFeatures: package.dataValues.PackageFeatures,
    };
  });

  successResponse(res, manipulatedData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

// get single package using id
const getSinglePackage = controllerWrapper(async (req, res, next) => {
  const packageId = req.params.id;
  const data = await Package.findOne({
    where: { id: packageId },
    include: [{ model: Item }, { model: PackageFeature, }],
  });
  if (!data) throw createAppError("This package is not found", HttpStatus.NotFound, 1);

  let { id, image, ...rest } = data.dataValues.Item.dataValues;
  image = `/u/package/${image}`
  const manipulatedData = {
    id: data.dataValues.id,
    image,
    ...rest,
    period: data.dataValues.period,
    itemId: data.dataValues.itemId,
    PackageFeatures: data.dataValues.PackageFeatures,

  };
  successResponse(res, manipulatedData);
});

// add new package
const addPackage = controllerWrapper(async (req, res, next) => {
  const {
    period,
    price,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    discountPercentage,
    packageFeatures
  } = req.body;

  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);

  /* ------------------------------- END ------------------------------- */

  const image = req.file?.filename;
  if (!image) {
    throw createAppError("image is required", HttpStatus.BadRequest, 5);
  }

  // Create a new item
  const item = await Item.create({
    discountPercentage,
    price,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    image,
    type: "package",
  });






  // Create a new product associated with the item
  const package = await Package.create({
    itemId: item.id,
    period,
  });



  // create a new features according to package table
  let recordsToAdd;
  Array.isArray(packageFeatures) && (recordsToAdd = packageFeatures.map((feature) => {
    return { featureAr: feature.featureAr, featureEn: feature.featureEn, packageId: package.id }
  }))
  const createPackageFeatures = await PackageFeature.bulkCreate(recordsToAdd)





  const { id, ...rest } = item.dataValues

  const allFeatures = createPackageFeatures.map((feature) => feature.dataValues);
  package.dataValues = { ...package.dataValues, ...rest, PackageFeature: allFeatures };
  successResponse(res, package);
});




// update package
const updatePackage = controllerWrapper(async (req, res, next) => {
  const packageId = req.params.id;
  const {
    period,
    price,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    discountPercentage,
    packageFeatures
  } = req.body;
  const image = req.file?.filename;

  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  /* ------------------------------- END ------------------------------- */

  const packageData = await Package.findOne({ where: { id: packageId } }); // get the package
  if (!packageData) throw createAppError("This package is not found", HttpStatus.NotFound, 1);


  const ItemData = await Item.findOne({     // get the item
    where: { id: packageData.dataValues.itemId },
  });
  if (!ItemData) throw createAppError("This package is not found", HttpStatus.NotFound, 1);

  if(image){ // to delete the old image to replace it with the new one

    const filePath = path.join(__dirname ,".." , ".." ,"..","uploads" , "package", ItemData.dataValues.image)
     clearImage(filePath)
}

  const featuresData = await PackageFeature.findAll({   // get all features
    where: { packageId },
  });

  let updatedData = {}; // to collect updated data on the two tables ( Item + package )

  /* ------------------------------- START ------------------------------- */
  // changing data on the package table
  period && (packageData.period = period);

  const savedPackageData = await packageData.save();
  updatedData = { ...savedPackageData.dataValues };
  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */
  // changing data on the items table

  discountPercentage && (ItemData.discountPercentage = discountPercentage);
  price && (ItemData.price = price);
  titleAr && (ItemData.titleAr = titleAr);
  titleEn && (ItemData.titleEn = titleEn);
  descriptionAr && (ItemData.descriptionAr = descriptionAr);
  descriptionEn && (ItemData.descriptionEn = descriptionEn);
  image && (ItemData.image = image);

  const savedItemData = await ItemData.save();
  if (savedItemData) {
    const { id, ...rest } = savedItemData.dataValues;
    updatedData = { ...updatedData, ...rest };
  }
  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */
  // changing data on the packageFeature table if there is any updated feature
  let updatedFeatures ;
  if (packageFeatures?.length) {
    PackageFeature.destroy({
      where:{packageId}
    });
    let recordsToAdd;

    Array.isArray(packageFeatures) && (recordsToAdd = packageFeatures.map((feature) => {
      return { featureAr: feature.featureAr, featureEn: feature.featureEn, packageId }
    }))
    const createPackageFeatures = await PackageFeature.bulkCreate(recordsToAdd);
    updatedFeatures = createPackageFeatures
  }
  updatedFeatures ? updatedData = { ...updatedData, packageFeatures:updatedFeatures   } : updatedData = { ...updatedData,  packageFeatures :featuresData   }

  /* ------------------------------- END ------------------------------- */


  successResponse(res, updatedData);
});



// delete package
const deletePackage = controllerWrapper(async (req, res, next) => {
  const packageId = req.params.id;

  const thePackage = await Package.findOne({
    where: { id: packageId },
    include: [{ model: Item }, { model: PackageFeature, }],
  });

  if (!thePackage)
    throw createAppError(
      "This package was not found",
      HttpStatus.BadRequest,
      100
    );
  const { id, ...rest } = thePackage.dataValues.Item.dataValues;
  const data = await Item.findOne({ where: { id } });

  if (!data)
    throw createAppError("This package was not found", HttpStatus.NotFound, 100);


      // to delete the image when the package item
  const filePath = path.join(__dirname, "..", "..", "..", "uploads", "package", data.dataValues.image)
  clearImage(filePath)
  // delete package from the Item table and it will be deleted from package table ( CASCADE )
  await data.destroy();

  // retrieve the convenient data
  const manipulatedData = {
    id: thePackage.dataValues.id,
    ...rest,
    period: thePackage.dataValues.period,
    PackageFeatures: thePackage.dataValues.PackageFeatures

  };

  successResponse(res, manipulatedData);
});

module.exports = {
  addPackage,
  getPackage,
  getSinglePackage,
  deletePackage,
  updatePackage,

};
