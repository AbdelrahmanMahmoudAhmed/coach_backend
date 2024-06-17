const {getAllBlogs , getSingleBlog } = require('../controller/blogs')

const express = require('express');



const router = express.Router();

// GET  (/blogs) 
router.get('/', getAllBlogs );

// GET single blog  (/blogs/1) 
router.get('/:id', getSingleBlog );





module.exports = router;
