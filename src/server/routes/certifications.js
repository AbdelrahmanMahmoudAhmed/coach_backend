const {getAllCertifications } = require('../controller/certifications')

const express = require('express');



const router = express.Router();

// GET  (/certifications) 
router.get('/', getAllCertifications );





module.exports = router;
