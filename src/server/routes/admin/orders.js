const {getAllOrders , getAllTypeOrder , changePaidState , changeProductOrderState , changePackageOrderData } = require('../../controller/orders')
const { allOrdersValidation , changePaidValidation , productOrderStateValidation , packageOrderStateValidation } = require('../../validation/orders')
const express = require('express');
const {  allowToDelete,allowToEdit } = require('../../middleware/isAuth')
const { ADMIN } =  require('../../../constant/roles')

const router = express.Router();



// GET get all orders
router.get('/' , allOrdersValidation ,  getAllOrders);
// GET get all product-orders
router.get('/products'  ,  getAllTypeOrder);
// GET get all product-orders
router.get('/packages'  ,  getAllTypeOrder);

// GET get single product-orders
router.get('/products/:orderId'  ,  getAllTypeOrder);
// GET get single product-orders
router.get('/packages/:orderId'  ,  getAllTypeOrder);


// POST post change paied state order;
router.post('/:orderId', allowToEdit(ADMIN)  ,changePaidValidation,  changePaidState);


// patch  change productOrder state;
router.patch('/products/:orderId',  allowToEdit(ADMIN)   ,productOrderStateValidation,  changeProductOrderState);

// POST post change PackageOrder state;
router.patch('/packages/:orderId',  allowToEdit(ADMIN)   ,packageOrderStateValidation,  changePackageOrderData);












module.exports = router;
