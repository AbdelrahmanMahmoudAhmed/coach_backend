const {  changePassword  } = require('../../controller/managePasswords')

const { changePasswordValidation  } = require('../../validation/passwords');

const { getCurrentUser } = require('../../middleware/isAuth')
const express = require('express');

const router = express.Router();





// patch  (/auth)  => changePassword
router.patch('/change-password', changePasswordValidation , getCurrentUser(),  changePassword);












module.exports = router;
