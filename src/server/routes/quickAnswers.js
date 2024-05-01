const express = require('express');

const { sequelize, QuickAnswer } = require('../../models')
// const { body } = require('express-validator/check');

// const feedController = require('../controllers/feed');


const router = express.Router();

// GET  (/quick_answers) 
router.post('/', (req, res, next) => {
    QuickAnswer.create({ question_ar: "saasd", question_en: "dfgdfg", answer_ar: "ertetr", answer_en: "ertet", created_at: "2023-11-11 00:00:00", updated_at: "2023-11-11 00:00:00" })
    .then((data) => {
        res.json(data)
    })
    .catch((err)=>{
        console.log("err" , err)
    })
   
});




module.exports = router;
