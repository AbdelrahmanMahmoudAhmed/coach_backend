const {getAllSections } = require('../controller/sections')

const express = require('express');



const router = express.Router();

// GET  (/sections) 
router.get('/', getAllSections );





module.exports = router;
