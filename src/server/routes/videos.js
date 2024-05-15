const {getAllVideos } = require('../controller/videos')

const express = require('express');



const router = express.Router();

// GET  (/videos) 
router.get('/', getAllVideos );





module.exports = router;
