const { getPackage , getSinglePackage , deletePackage , updatePackage, addPackage  } = require('../../controller/packages')
const {addPackageValidation , updatePackageValidation } = require('../../validation/packages');
const express = require('express');
const {  allowToDelete , allowToEdit } = require('../../middleware/isAuth')
const { ADMIN  } =  require('../../../constant/roles')

const router = express.Router();





// GET  (/packages) 
router.get('/',  getPackage);
// GET  (/packages) 
router.get('/:id',  getSinglePackage);
// POST  (/packages) 
router.post('/', allowToEdit(ADMIN) , addPackageValidation, addPackage);
// // DELETE  (/packages) 
router.delete('/:id', allowToDelete(ADMIN) , deletePackage);
// // PATCH  (/packages) 
router.patch('/:id', allowToEdit(ADMIN) , updatePackageValidation  ,updatePackage);







module.exports = router;
