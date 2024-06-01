const {  CartItem, Item, Product, Package } = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { Op } = require("sequelize");
const { collectCartData} = require('../utils/handleQueryData') 



const getCartItems = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  /* ------------------------------- START ------------------------------- */

  // pagination and search variables

  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const searchTerm = req.query.search || "";
  const totalCount = await CartItem.count({
    where: {
      clientId,
    },
  });

  /* ------------------------------- END ------------------------------- */

  const data = await CartItem.findAll({
    where: {
      clientId,
    },

    include: [
      {
        model: Item,
        include: [
          {
            model: Product,
          },
          {
            model: Package,
          },
        ],
      },
    ],

    limit: perPage,
    offset,
  });

  const handleData = data.map((item)=> collectCartData(item))
  successResponse(res, handleData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

const addToCart = controllerWrapper(async (req, res, next) => {
  const { itemId, quantity } = req.body;
  const clientId = req.auth.id;
  await validationChecker(req, res); // validation
  /* ------------------------------- START ------------------------------- */

  // check if the item is found
  const checkItemType = await Item.findOne({
    where: {
      id: itemId,
    },
  });

  if (!checkItemType)
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);
  /* ------------------------------- END ------------------------------- */

  // get the type of the item
  const type = checkItemType.type;

  const checkItem = await CartItem.findOne({
    where: {
      clientId,
      itemId,
    },
  });

  if (!checkItem) {
    let quantityChecker = type == "package" ? 1 : quantity

   
    const addToCart = await CartItem.create({ itemId,quantity :quantityChecker , clientId });
    successResponse(res, addToCart, 201);
  } else {
    // check if the type of the item is package , can not increase it
    if (type == "package")
      throw createAppError(
        "can not increase packages ",
        HttpStatus.BadRequest,
        100
      );

    // increase the quantity of product
    checkItem.quantity = checkItem.quantity + 1;
    const modifiedCartItem = await checkItem.save();

    successResponse(res, modifiedCartItem, 200);
  }
});



const modifyItemQuantity = controllerWrapper(async (req, res, next) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;
  const clientId = req.auth.id;
  await validationChecker(req, res); // validation

  /* ------------------------------- START ------------------------------- */

  // check if the cart item is found and it owned by the logged in client
  const checkItem = await CartItem.findOne({
    where: {
      id: cartItemId,
      clientId,
    },
    include: [
      {
        model: Item,
        include: [
          {
            model: Product,
          },
          {
            model: Package,
          },
        ],
      },
    ],
  });

  if (!checkItem)
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);
  /* ------------------------------- END ------------------------------- */

  // get the type of the item
  const type = checkItem.dataValues.Item.dataValues.type;

  if (type == "package") {
    // check if the type of the item is package , can not increase it

    throw createAppError(
      "can not increase packages ",
      HttpStatus.BadRequest,
      100
    );
  } else {
    checkItem.quantity = quantity;
    const modifiedCartItem = await checkItem.save();

    collectCartData(modifiedCartItem)
    successResponse(res, collectCartData(modifiedCartItem), 200);
  }
});


const deleteCartItem = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const clientId = req.auth.id;

  const data = await CartItem.findOne({ where: { id , clientId } });

  if (!data)
    throw createAppError("This item was not found", HttpStatus.NotFound, 100);

  const deletedItemData = await data.destroy();
  successResponse(res, deletedItemData);
});

const emptyCart = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;

  const data = await CartItem.findAll({ where: { clientId } });

  if (!data || !data.length)
    throw createAppError("has not a cart items", HttpStatus.NotFound, 100);

  const deletedItemsData = await CartItem.destroy({
    where: {
      clientId,
    }
  });  successResponse(res, deletedItemsData);
});

module.exports = {
  addToCart,
  getCartItems,
  modifyItemQuantity,
  deleteCartItem,
  emptyCart
};
