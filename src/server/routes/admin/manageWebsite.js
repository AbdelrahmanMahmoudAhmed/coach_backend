const { addQuickAnswer, deleteQuickAnswer , updateQuickAnswer } = require('../../controller/quickAnswers')
const {addQuickAnswerValidation , updateQuickAnswerValidation } = require('../../validation/quickAnswers')
const express = require('express');


  
const router = express.Router();



/* --------------------------------- QUICK ANSWER SECTION --------------------------------- */
// POST  (/quick_answers) 
router.post('/quick-answer',addQuickAnswerValidation, addQuickAnswer);
// DELETE  (/quick_answers) 
router.delete('/quick-answer/:id', deleteQuickAnswer);

// PATCH  (/quick_answers) 
router.patch('/quick-answer/:id', updateQuickAnswerValidation  ,updateQuickAnswer);




module.exports = router;
