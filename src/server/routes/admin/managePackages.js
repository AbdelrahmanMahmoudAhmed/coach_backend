const { getProducts , getSingleProduct , deleteProduct , updateProduct, addProduct  } = require('../../controller/packages')
const {addPackageValidation , updatePackageValidation } = require('../../validation/packges');
const express = require('express');
const {  allowToDelete , allowToEdit } = require('../../middleware/isAuth')
const { ADMIN  } =  require('../../../constant/roles')

const router = express.Router();





// GET  (/packages) 
router.get('/',  getProducts);
// GET  (/packages) 
router.get('/:id',  getSingleProduct);
// POST  (/packages) 
router.post('/', allowToEdit(ADMIN) , addPackageValidation, addProduct);
// // DELETE  (/packages) 
router.delete('/:id', allowToDelete(ADMIN) , deleteProduct);
// // PATCH  (/packages) 
router.patch('/:id', allowToEdit(ADMIN) , updatePackageValidation  ,updateProduct);







module.exports = router;
