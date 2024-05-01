const express = require('express');
// const { body } = require('express-validator/check');

// const feedController = require('../controllers/feed');


const router = express.Router();

// GET (/) HOME PAGE
router.get('/',  (req , res , next)=>{
    res.json('its home page')
});




module.exports = router;
