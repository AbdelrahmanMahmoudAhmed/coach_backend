const {getAllTransformations } = require('../controller/transformation')

const express = require('express');



const router = express.Router();

// GET  (/transformations) 
router.get('/', getAllTransformations );





module.exports = router;
