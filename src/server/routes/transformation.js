const {getAllTransformations } = require('../controller/transformation')

const express = require('express');



const router = express.Router();

// GET  (/quick_answers) 
router.get('/', getAllTransformations );





module.exports = router;
