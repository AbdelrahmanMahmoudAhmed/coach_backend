const { getMe , updateMe  } = require('../../controller/clients')
const { updateClientValidation } = require('../../validation/clients');
const express = require('express');
const {  isAuth } = require('../../middleware/isAuth')
const { CLIENT  } =  require('../../../constant/roles')

const router = express.Router();





// GET  get client data 
router.get('/', isAuth(CLIENT) ,  getMe);
// PATCH  update the client data
router.patch('/', isAuth(CLIENT) , updateClientValidation  ,updateMe);







module.exports = router;
