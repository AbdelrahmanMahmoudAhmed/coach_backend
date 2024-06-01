const {getAllOrders , getAllTypeOrder , changePaidState , changeProductOrderState , changePackageOrderData } = require('../../controller/orders')
const { allOrdersValidation , changePaidValidation , productOrderStateValidation , packageOrderStateValidation } = require('../../validation/orders')
const express = require('express');
const {  isAuth } = require('../../middleware/isAuth')
const { ADMIN , ALLOW_TO_DELETE,ALLOW_TO_EDIT  } =  require('../../../constant/roles')

const router = express.Router();



// GET get all orders
router.get('/', isAuth(ADMIN) , allOrdersValidation ,  getAllOrders);
// GET get all product-orders
router.get('/products', isAuth(ADMIN)  ,  getAllTypeOrder);
// GET get all product-orders
router.get('/packages', isAuth(ADMIN)  ,  getAllTypeOrder);

// GET get single product-orders
router.get('/products/:orderId', isAuth(ADMIN)  ,  getAllTypeOrder);
// GET get single product-orders
router.get('/packages/:orderId', isAuth(ADMIN)  ,  getAllTypeOrder);


// POST post change paied state order;
router.post('/:orderId', isAuth(ADMIN)  ,changePaidValidation,  changePaidState);


// POST post change productOrder state;
router.post('/products/:orderId', isAuth(ADMIN)  ,productOrderStateValidation,  changeProductOrderState);

// POST post change PackageOrder state;
router.post('/packages/:orderId', isAuth(ADMIN)  ,packageOrderStateValidation,  changePackageOrderData);












module.exports = router;
