const {getPackage } = require('../controller/packages')

const express = require('express');



const router = express.Router();

// GET  (/packages) 
router.get('/', getPackage );





module.exports = router;
