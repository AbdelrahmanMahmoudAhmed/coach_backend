const {getLayout } = require('../controller/layout')

const express = require('express');



const router = express.Router();

// GET  (/layout) 
router.get('/', getLayout );





module.exports = router;
