const {  login ,signIn } = require('../../controller/clientAuth')
const {addClientValidation , updateClientValidation } = require('../../validation/clients');
const { loginValidation } = require('../../validation/auth')
const express = require('express');

const router = express.Router();





// POST  (/client)  => login
router.post('/login', loginValidation ,   login);

// POST  (/client)  => login
router.post('/sign-in', addClientValidation ,  signIn);










module.exports = router;
