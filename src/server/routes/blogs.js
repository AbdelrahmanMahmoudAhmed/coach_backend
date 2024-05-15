const {getAllBlogs } = require('../controller/blogs')

const express = require('express');



const router = express.Router();

// GET  (/blogs) 
router.get('/', getAllBlogs );





module.exports = router;
