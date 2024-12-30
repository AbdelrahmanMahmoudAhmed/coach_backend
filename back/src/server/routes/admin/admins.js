const { updateMe , getMe , updatePassword } = require('../../controller/admins')
const { updateAdminValidation , updatePasswordValidation } = require('../../validation/admins');
const express = require('express');
const { ADMIN  } =  require('../../../constant/roles');



const router = express.Router();

router.get('/admin/me' ,getMe); 
router.patch('/admin/me', updateAdminValidation ,updateMe);
router.put('/admin/password', updatePasswordValidation ,updatePassword);



module.exports = router;
