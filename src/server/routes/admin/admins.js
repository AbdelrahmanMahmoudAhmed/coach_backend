const { getAdmins, addAdmin , getSingleAdmin , deleteAdmin , updateAdmin , updateMe , getMe } = require('../../controller/admins')
const {addAdminValidation , updateAdminValidation } = require('../../validation/admins');
const express = require('express');
const {isSuperAdmin} = require('../../middleware/isAuth')
const { ADMIN  } =  require('../../../constant/roles')

const router = express.Router();





// GET  (/admins) 
router.get('/admins',  getAdmins);
// // GET  (/admins/me) 
router.get('/admins/me' ,getMe);
// GET  (/admins) 
router.get('/admins/:id',  getSingleAdmin);
// POST  (/admins) 
router.post('/admins', isSuperAdmin(ADMIN) , addAdminValidation, addAdmin);
// // DELETE  (/admins) 
router.delete('/admins/:id', isSuperAdmin(ADMIN) , deleteAdmin);
// // PATCH  (/admins/me) 
router.patch('/admins/me', updateAdminValidation  ,updateMe);
// // PATCH  (/admins) 
router.patch('/admins/:id', isSuperAdmin(ADMIN) , updateAdminValidation  ,updateAdmin);








module.exports = router;
