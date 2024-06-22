const {  changePassword , forgetPassword , resetPassword} = require('../../controller/managePasswords')

const { changePasswordValidation , emailValidation , resetPasswordValidation  } = require('../../validation/passwords');

const { getCurrentUser } = require('../../middleware/isAuth')
const express = require('express');

const router = express.Router();





// patch  (/auth)  => changePassword
router.patch('/change-password', changePasswordValidation , getCurrentUser(),  changePassword);


// patch  (/auth)  => changePassword
router.patch('/forget-password', emailValidation ,  forgetPassword);

// patch  (/auth)  => resetPassword
router.patch('/reset-password', resetPasswordValidation ,  resetPassword);












module.exports = router;
