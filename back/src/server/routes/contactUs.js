const {addMessage } = require('../controller/contactUs')
const {addMessageValidation } = require("../validation/contactUs")
const express = require('express');



const router = express.Router();

// POST  (/contact-us) 
router.post('/', addMessageValidation , addMessage );





module.exports = router;
