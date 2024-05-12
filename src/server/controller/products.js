const { Item, Product } = require("../../models");
const { Op } = require("sequelize");

const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");

// get all products with pagination
const getProducts = controllerWrapper(async (req, res, next) => {
  /* ------------------------------- START ------------------------------- */
  // pagination and search variables
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 2;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await Product.count({
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
    where: {
      [Op.or]: [{ shippingPrice: { [Op.like]: `%${searchTerm}%` } }],
    },
  });
  /* ------------------------------- END ------------------------------- */

  const data = await Product.findAll({
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
    ],
    limit: perPage,
    offset,
    where: {
      [Op.or]: [{ shippingPrice: { [Op.like]: `%${searchTerm}%` } }],
    },
  });
  console.log("data", data);
  const manipulatedData = data.map((product) => {
    const { id, ...rest } = product.dataValues.Item.dataValues;
    return {
      id: product.dataValues.id,
      ...rest,
      shippingPrice: product.dataValues.shippingPrice,
    };
  });

  successResponse(res, manipulatedData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

// get single product using id
const getSingleProduct = controllerWrapper(async (req, res, next) => {
  const productId = req.params.id;
  const data = await Product.findOne({
    where: { id: productId },
    include: "Item",
  });
  if (!data)
    throw createAppError("This product is not found", HttpStatus.NotFound, 1);

  const { id, ...rest } = data.dataValues.Item.dataValues;

  const manipulatedData = {
    id: data.dataValues.id,
    ...rest,
    shippingPrice: data.dataValues.shippingPrice,
  };
  successResponse(res, manipulatedData);
});

// add new product
const addProduct = controllerWrapper(async (req, res, next) => {
  const {
    discountPercentage,
    price,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    shippingPrice,
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
    type: "product",
  });
  const { id , ...rest} =  item.dataValues

  // Create a new product associated with the item
  const product = await Product.create({
    itemId: item.id,
    shippingPrice,
  });
  product.dataValues = { ...product.dataValues, ...rest };
  successResponse(res, product);
});

// update product
const updateProduct = controllerWrapper(async (req, res, next) => {
  const productID = req.params.id;
  const {
    discountPercentage,
    price,
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    shippingPrice,
  } = req.body;
  const image = req.file?.filename;

  /* ------------------------------- START ------------------------------- */
  // validate the data
    await validationChecker(req, res);
  /* ------------------------------- END ------------------------------- */

  const productData = await Product.findOne({ where: { id: productID } });
  if (!productData )
    throw createAppError("This product is not found", HttpStatus.NotFound, 1);
  const ItemData = await Item.findOne({
    where: { id: productData.dataValues.itemId },
  });
  if ( !ItemData)
    throw createAppError("This product is not found", HttpStatus.NotFound, 1);

  let updatedData = {}; // to collect updated data on the two tables ( Item + Product )

  /* ------------------------------- START ------------------------------- */
  // changing data on the Product table
  shippingPrice && (productData.shippingPrice = shippingPrice);

  const savedProductData = await productData.save();
  updatedData = { ...savedProductData.dataValues };
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

  successResponse(res, updatedData);
});



// delete Product
const deleteProduct = controllerWrapper(async (req, res, next) => {
  const productId = req.params.id;

  const theProduct = await Product.findOne({
    where: { id: productId },
    include: "Item",
  });

  if (!theProduct)
    throw createAppError(
      "This product was not found",
      HttpStatus.BadRequest,
      100
    );
  const { id, ...rest } = theProduct.dataValues.Item.dataValues;
  const data = await Item.findOne({ where: { id } });

  if (!data)
    throw createAppError("This product was not found", HttpStatus.NotFound, 100);

  // delete product from the Item table and it will be deleted from product table ( CASCADE )
  await data.destroy();

  // retrieve the convenient data
  const manipulatedData = {
    id: theProduct.dataValues.id,
    ...rest,
    shippingPrice: theProduct.dataValues.shippingPrice,

  };

  successResponse(res, manipulatedData);
});

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,

};
