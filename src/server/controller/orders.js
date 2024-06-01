const {
  CartItem,
  Item,
  Product,
  Package,
  Order,
  ItemOrder,
  PackageOrder,
  ProductOrder,
  Client,
  Person
} = require("../../models");
const { createAppError } = require("../utils/error");
const { successResponse } = require("../utils/response");
const { HttpStatus } = require("../utils/httpCodes");
const validationChecker = require("../validation/checker");
const controllerWrapper = require("../utils/controllerWrapper");
const { handleClientOrderData ,handleAdminOrderData , handleGetOrderTypesData} = require('../utils/handleQueryData')
const { Op } = require("sequelize");




const getAllTypeOrder = controllerWrapper(async (req, res, next) => {


  // get from the right table depending on the requist URL

  let requistType ;

  const getTable =()=>{
    if(req.url.startsWith('/products')){
      requistType = "product"
      return ProductOrder;
    }else if(req.url.startsWith("/packages") ){
      requistType = 'package'
      return PackageOrder;
    }else{
          throw createAppError(
        "this requist not found",
        HttpStatus.BadRequest,
        100
      );
    }
  }
  
  const {orderId} =req.params 
  /* ------------------------------- START ------------------------------- */

  // pagination and filter variables

  const clientId = req.query.clientId ;

  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await getTable().count({});

  /* ------------------------------- END ------------------------------- */
const query = {
  where: { },
  include: [
    {
      model: ItemOrder,
      include: [
        { model: Item,},
        { 
          model: Order,
          include:[{
          model: Client,
          where: { },
          include:[{ model: Person,}]
        }]
        }
      ],
    },
  ],
}

if(orderId){
  query.where = {id : orderId} 
}else{
  // add pagenation if the query has not params
  query.limit = perPage,
query.offset = offset
}

if(clientId) query.where = {id : clientId} 

  const data = orderId ? await  getTable().findOne(query) :   await  getTable().findAll(query) ;

const pagination = orderId ? [] :  [{ pagination: { currentPage: page, perPage, totalCount } }  ]
const handledData = orderId ?handleGetOrderTypesData(data, requistType): data.map((item)=> handleGetOrderTypesData(item , requistType))  ;



  successResponse(res, handledData, 200,pagination);
});

const getAllOrders = controllerWrapper(async (req, res, next) => {
  
  /* ------------------------------- START ------------------------------- */

  // pagination and filter variables
  const typeTerm = req.query.type || ""
  const paidTerm = req.query.paid || ""
  /* ------------------------------- START ------------------------------- */
  // validate the data
  await validationChecker(req, res);
  /* ------------------------------- END ------------------------------- */  
  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Order.count({});

  /* ------------------------------- END ------------------------------- */
const query = {
  where: { },
  include: [
    {
      model: ItemOrder,
      include: [
        {
          model: Item,
        },
      
      ],
    },
    {
      model: Client,
      where: { },
      include:[{ model: Person,}]
    }
  ],

  limit: perPage,
  offset,
}
if(paidTerm) query.where = {isPaid : paidTerm} 
if(typeTerm) query.include[0].where = {type : typeTerm} 


  const data = await Order.findAll(query);

const handledData = data.map((item)=> handleAdminOrderData(item));
  successResponse(res, handledData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});

const getClientOrders = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  /* ------------------------------- START ------------------------------- */

  // pagination and search variables

  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await Order.count({
    where: {
      clientId,
    },
  });

  /* ------------------------------- END ------------------------------- */

  const data = await Order.findAll({
    where: {
      clientId,
    },

    include: [
      {
        model: ItemOrder,
        include: [
          {
            model: Item,
          },
        ],
      },
    ],

    limit: perPage,
    offset,
  });
  successResponse(res, data, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});


const changePaidState = controllerWrapper(async (req, res, next) => {

    const {paid} = req.body;
    const id = req.params.orderId
      // validate the data
  await validationChecker(req, res);

  const data = await Order.findOne({
    where: {
      id,
    },
  });

  data.isPaid = paid == 1 ? true : false
  const changedData = await data.save();
  successResponse(res, changedData, 200, );
});

const changeProductOrderState =  controllerWrapper(async (req, res, next) => {

  const {state} = req.body;
  const id = req.params.orderId
  console.log("state" , state)
    // validate the data
await validationChecker(req, res);

const data = await ProductOrder.findOne({
  where: {
    id,
  },
});

data.state = state ;
const changedData = await data.save();
successResponse(res, changedData, 200, );
});

const changePackageOrderData =  controllerWrapper(async (req, res, next) => {

  const {state ,  dietPlanAr , dietPlanEn , supplementsAr , supplementsEn , trainingAr , trainingEn} = req.body;
  const id = req.params.orderId
    // validate the data
await validationChecker(req, res);

const data = await PackageOrder.findOne({
  where: {
    id,
  },
});

state && (data.state = state) ;
dietPlanAr && (data.dietPlanAr = dietPlanAr) ;
dietPlanEn && (data.dietPlanEn = dietPlanEn) ;
supplementsAr && (data.supplementsAr = supplementsAr) ;
supplementsEn && (data.supplementsEn = supplementsEn) ;
trainingAr && (data.trainingAr = trainingAr) ;
trainingEn && (data.trainingEn = trainingEn) ;


const changedData = await data.save();
successResponse(res, changedData, 200, );
});




const addOrders = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  console.log('req.auth.id', req.auth.id)
  /* ------------------------------- START ------------------------------- */

  // check client's cart
  const checkCart = await CartItem.findAll({
    where: {
      clientId,
    },
    include: [
      {
        model: Item,
      },
    ],
  });

  if (!checkCart || !checkCart.length)
    throw createAppError("The cart is empty", HttpStatus.BadRequest, 100);
  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */

  // get all items from the cart and get total price
  const itemIds = checkCart.map((cartItem) => cartItem.itemId);

  const items = await Item.findAll({
    where: {
      id: {
        [Op.in]: itemIds,
      },
    },
    include: [
      {
        model: Product,
      },
      {
        model: Package,
      },
    ],
  });

  //get the total price
  const totalPrice = items.reduce(
    (accumulator, currentValue) => accumulator + +currentValue.dataValues.price,
    0
  );
  //   console.log("totalPrice" , totalPrice)

  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */
  // add a new order

  const newOrder = await Order.create({ clientId, totalPrice });
  // handle the array of object to insert them on the ItemOrder table and both of ( ProductOrder and PackageOrder )
  const cartProducts = [];
  const cartPackage = [];
  checkCart.forEach((cartItem) => {
    if (cartItem.dataValues.Item.dataValues.type == "product") {
      cartProducts.push({
        orderId: newOrder.dataValues.id,
        itemId: cartItem.dataValues.itemId,
        type: "product",
        quantity: cartItem.dataValues.quantity,
        ProductOrder: {
          state: "ordered",
          clientId,
        },
      });
    } else {
      cartPackage.push({
        orderId: newOrder.dataValues.id,
        itemId: cartItem.dataValues.itemId,
        type: "package",
        quantity: cartItem.dataValues.quantity,
        PackageOrder: {
          state: "ordered",
          clientId,
        },
      });
    }
  });

  const addedProductOrders = cartProducts
    ? await ItemOrder.bulkCreate(cartProducts, {
        include: [ProductOrder],
      })
    : null;

  const addedPackageOrders = cartPackage
    ? await ItemOrder.bulkCreate(cartPackage, {
        include: [PackageOrder],
      })
    : null;



  if (!addedProductOrders && !addedPackageOrders)
    throw createAppError(
      "The items can not be add to the client orders",
      HttpStatus.BadRequest,
      100
    );

  /* ------------------------------- END ------------------------------- */

  /* ------------------------------- START ------------------------------- */
  // empty the cart
  await CartItem.destroy({
    where: {
      clientId,
    },
  });
  /* ------------------------------- END ------------------------------- */
  successResponse(res, { data: "the order has been added successfuly" });
});

const getClientOrderedPackages = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  /* ------------------------------- START ------------------------------- */

  // pagination and search variables

  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await PackageOrder.count({
    include: [
      {
        model: ItemOrder,
        include: {
          model: Order,
          where: {
            clientId,
          },
        },
      },
    ],
  });

  /* ------------------------------- END ------------------------------- */

  const data = await PackageOrder.findAll({
    include: [
      {
        model: ItemOrder,
        include:[  {
          model: Order,
          where: {
            clientId,
          },
        } , { model : Item}],
      },
    ],

    limit: perPage,
    offset,
  });


  const manipulatedData = data.map((obj) => handleClientOrderData(obj));
  successResponse(res, manipulatedData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});
const getSingleClientOrderedPackage = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  const { id } =  req.params;
  const data = await PackageOrder.findOne({
    include: [
      {
        model: ItemOrder,
        include:[  {
          model: Order,
          where: {
            clientId,
          },
        } , { model : Item}],
      },
    ],
where: {id},

  });


  const manipulatedData =  handleClientOrderData(data);
  successResponse(res, manipulatedData, 200);
});

const getClientOrderedProduct = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  /* ------------------------------- START ------------------------------- */

  // pagination and search variables

  const page = req.query.page && !isNaN(+req.query.page) ? +req.query.page : 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;
  const totalCount = await ProductOrder.count({
    include: [
      {
        model: ItemOrder,
        include: {
          model: Order,
          where: {
            clientId,
          },
        },
      },
    ],
  });

  /* ------------------------------- END ------------------------------- */

  const data = await ProductOrder.findAll({
    include: [
      {
        model: ItemOrder,
        include:[  {
          model: Order,
          where: {
            clientId,
          },
        } , { model : Item}],
      },
    ],

    limit: perPage,
    offset,
  });


  const manipulatedData = data.map((obj) => handleClientOrderData(obj));
  successResponse(res, manipulatedData, 200, [
    { pagination: { currentPage: page, perPage, totalCount } },
  ]);
});
const getSingleClientOrderedProduct = controllerWrapper(async (req, res, next) => {
  const clientId = req.auth.id;
  const { id } =  req.params;
  const data = await ProductOrder.findOne({
    include: [
      {
        model: ItemOrder,
        include:[  {
          model: Order,
          where: {
            clientId,
          },
        } , { model : Item}],
      },
    ],
where: {id},

  });


  const manipulatedData =  handleClientOrderData(data);
  successResponse(res, manipulatedData, 200);
});

module.exports = {
  addOrders,
  getClientOrders,
  getClientOrderedPackages,
  getSingleClientOrderedPackage,
  getClientOrderedProduct,
  getSingleClientOrderedProduct,
  getAllOrders,
  getAllTypeOrder,
  changePaidState,
  changeProductOrderState,
  changePackageOrderData
};
