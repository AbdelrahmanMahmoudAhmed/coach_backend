const {getAllQuickAnswer } = require('../controller/quickAnswers')

const express = require('express');

const { body } = require('express-validator');


const router = express.Router();

// GET  (/quick_answers) 
router.get('/', getAllQuickAnswer );





module.exports = router;
