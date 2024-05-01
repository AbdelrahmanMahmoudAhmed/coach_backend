const { addQuickAnswer , getAllQuickAnswer , deleteQuickAnswer} = require('../controller/quickAnswers')

const express = require('express');

const { sequelize, QuickAnswer } = require('../../models');

const { body } = require('express-validator');


const router = express.Router();

// GET  (/quick_answers) 
router.get('/', getAllQuickAnswer );
// POST  (/quick_answers) 

router.post('/', addQuickAnswer);
// DELETE  (/quick_answers) 

router.delete('/:id', deleteQuickAnswer);




module.exports = router;
