const { getAdmins, addAdmin , getSingleAdmin , deleteAdmin , updateAdmin  } = require('../../controller/admins')
const {addAdminValidation , updateAdminValidation } = require('../../validation/admins');
const express = require('express');

const router = express.Router();





// GET  (/admins) 
router.get('/admins',  getAdmins);
// GET  (/admins) 
router.get('/admins/:id',  getSingleAdmin);
// POST  (/admins) 
router.post('/admins', addAdminValidation, addAdmin);
// // DELETE  (/admins) 
router.delete('/admins/:id', deleteAdmin);
// // PATCH  (/admins) 
router.patch('/admins/:id', updateAdminValidation  ,updateAdmin);







module.exports = router;
