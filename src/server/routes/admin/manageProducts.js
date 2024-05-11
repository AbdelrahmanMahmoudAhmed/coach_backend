const { getProducts , getSingleProduct , deleteProduct , updateProduct  } = require('../../controller/products')
const {addProductValidation , updateProductValidation } = require('../../validation/product');
const express = require('express');
const {  allowToDelete , allowToEdit } = require('../../middleware/isAuth')
const { ADMIN  } =  require('../../../constant/roles')

const router = express.Router();





// GET  (/products-management) 
router.get('/',  getProducts);
// GET  (/products-management) 
router.get('/:id',  getSingleProduct);
// POST  (/products-management) 
router.post('/', allowToEdit(ADMIN) , addProductValidation, updateProduct);
// // DELETE  (/products-management) 
router.delete('/:id', allowToDelete(ADMIN) , deleteProduct);
// // PATCH  (/products-management) 
router.patch('/:id', allowToEdit(ADMIN) , updateProductValidation  ,updateProduct);







module.exports = router;
