const {  login ,signIn } = require('../../controller/clientAuth')
const express = require('express');

const router = express.Router();





// POST  (/client)  => login
router.post('/login',  login);

// POST  (/client)  => login
router.post('/sign-in',  signIn);










module.exports = router;
