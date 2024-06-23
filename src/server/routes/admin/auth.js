const {  login } = require('../../controller/adminAuth')
const express = require('express');
const { loginValidation } = require('../../validation/auth')

const router = express.Router();





// GET  (/auth)  => login
router.post('/auth', loginValidation,  login);








module.exports = router;
