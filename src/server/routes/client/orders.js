const { addOrders , getClientOrders , getClientOrderedPackages , getSingleClientOrderedPackage , getClientOrderedProduct,
    getSingleClientOrderedProduct  } = require('../../controller/orders')

const express = require('express');
const {  isAuth } = require('../../middleware/isAuth')
const { CLIENT  } =  require('../../../constant/roles')

const router = express.Router();



// GET get the cart items
router.get('/', isAuth(CLIENT) ,   getClientOrders);


// GET get the cart items
//get packages
router.get('/packages', isAuth(CLIENT) ,   getClientOrderedPackages);
router.get('/packages/:id', isAuth(CLIENT) ,   getSingleClientOrderedPackage);
//get packages
router.get('/products', isAuth(CLIENT) ,   getClientOrderedProduct);
router.get('/products/:id', isAuth(CLIENT) ,   getSingleClientOrderedProduct);

// POST add a product or package to cart
router.post('/', isAuth(CLIENT)  ,   addOrders);








module.exports = router;
