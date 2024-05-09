const {  login } = require('../../controller/adminAuth')
const express = require('express');

const router = express.Router();





// GET  (/auth)  => login
router.post('/auth',  login);








module.exports = router;
