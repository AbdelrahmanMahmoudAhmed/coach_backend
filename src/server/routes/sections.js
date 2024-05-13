const {getAllSections } = require('../controller/sections')

const express = require('express');



const router = express.Router();

// GET  (/transformations) 
router.get('/', getAllSections );





module.exports = router;
