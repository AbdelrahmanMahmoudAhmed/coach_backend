const {  login ,signIn } = require('../../controller/clientAuth')
const express = require('express');

const router = express.Router();





// POST  (/auth)  => login
router.post('/login',  login);

// POST  (/auth)  => login
router.post('/sign-in',  signIn);










module.exports = router;
