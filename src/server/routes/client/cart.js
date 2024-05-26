const { addToCart , getCartItems , modifyItemQuantity , deleteCartItem , emptyCart } = require('../../controller/cart')
const { requiredQuantity , addCartItemValidation } = require('../../validation/cart');
const express = require('express');
const {  isAuth } = require('../../middleware/isAuth')
const { CLIENT  } =  require('../../../constant/roles')

const router = express.Router();



// GET get the cart items
router.get('/', isAuth(CLIENT) ,   getCartItems);

// POST add a product or package to cart
router.post('/add-item', isAuth(CLIENT) ,addCartItemValidation ,   addToCart);

// PATCH modify the cart items' quantity 
router.patch('/modify-quantity/:id', isAuth(CLIENT) , requiredQuantity , modifyItemQuantity);


// DELETE  a cart item 
router.delete('/:id', isAuth(CLIENT) ,  deleteCartItem);


// DELETE  empty the clents' cart
router.delete('/', isAuth(CLIENT) ,  emptyCart);






module.exports = router;
