const {  login } = require('../../controller/adminAuth')
const {addAdminValidation , updateAdminValidation } = require('../../validation/admins');
const express = require('express');

const router = express.Router();





// GET  (/auth)  => login
router.post('/auth',  login);








module.exports = router;
