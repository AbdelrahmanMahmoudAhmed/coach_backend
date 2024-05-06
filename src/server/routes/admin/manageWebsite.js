const { addQuickAnswer, deleteQuickAnswer , updateQuickAnswer } = require('../../controller/quickAnswers')
const { addTransformation, updateTransformation,deleteTransformation } = require('../../controller/transformation')
const {addQuickAnswerValidation , updateQuickAnswerValidation } = require('../../validation/quickAnswers');
const {addTransformationValidation , updateTransformationValidation } = require('../../validation/transformation');
const express = require('express');
const path = require('path')


  
const router = express.Router();







/* --------------------------------- QUICK ANSWER SECTION --------------------------------- */
// POST  (/quick_answers) 
router.post('/quick-answers', addQuickAnswerValidation, addQuickAnswer);
// DELETE  (/quick_answers) 
router.delete('/quick-answers/:id', deleteQuickAnswer);
// PATCH  (/quick_answers) 
router.patch('/quick-answers/:id', updateQuickAnswerValidation  ,updateQuickAnswer);


/* --------------------------------- TTANSFORMAION SECTION --------------------------------- */
// POST  (/transformations) 
router.post('/transformations', addTransformationValidation, addTransformation);
// DELETE  (/transformations) 
router.delete('/transformations/:id', deleteTransformation);
// PATCH  (/transformations) 
router.patch('/transformations/:id', updateTransformationValidation  ,updateTransformation);




module.exports = router;
