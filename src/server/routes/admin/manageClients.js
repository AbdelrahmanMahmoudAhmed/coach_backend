const { getClients, addClient , getSingleClient , deleteClient , updateClient  } = require('../../controller/clients')
const {addClientValidation , updateClientValidation } = require('../../validation/clients');
const express = require('express');
const {  allowToDelete , allowToEdit } = require('../../middleware/isAuth')
const { ADMIN  } =  require('../../../constant/roles')

const router = express.Router();





// GET  (/clients-management) 
router.get('/',  getClients);
// GET  (/clients-management) 
router.get('/:id',  getSingleClient);
// POST  (/clients-management) 
router.post('/', allowToEdit(ADMIN) , addClientValidation, addClient);
// // DELETE  (/clients-management) 
router.delete('/:id', allowToDelete(ADMIN) , deleteClient);
// // PATCH  (/clients-management) 
router.patch('/:id', allowToEdit(ADMIN) , updateClientValidation  ,updateClient);







module.exports = router;
