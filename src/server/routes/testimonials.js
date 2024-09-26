const {getAllTestimonials } = require('../controller/testimonials')

const express = require('express');



const router = express.Router();

// GET  (/testimonials) 
router.get('/', getAllTestimonials );





module.exports = router;
