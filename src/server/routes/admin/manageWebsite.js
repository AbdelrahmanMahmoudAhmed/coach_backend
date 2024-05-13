// controllers
const { addQuickAnswer, deleteQuickAnswer , updateQuickAnswer } = require('../../controller/quickAnswers')
const { addTransformation, updateTransformation,deleteTransformation } = require('../../controller/transformation')
const { getAllSections, addSections, updateSections,deleteSections } = require('../../controller/sections')


// validation
const {addQuickAnswerValidation , updateQuickAnswerValidation } = require('../../validation/quickAnswers');
const {addTransformationValidation , updateTransformationValidation } = require('../../validation/transformation');
const sectionValidation = require('../../validation/sections');

// middlewares
const {  allowToDelete , allowToEdit , isAuth} = require('../../middleware/isAuth');
const {ADMIN} = require('../../../constant/roles')
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


/* --------------------------------- TRANSFORMATION SECTION --------------------------------- */
// POST  (/transformations) 
router.post('/transformations', addTransformationValidation, addTransformation);
// DELETE  (/transformations) 
router.delete('/transformations/:id', deleteTransformation);
// PATCH  (/transformations) 
router.patch('/transformations/:id', updateTransformationValidation  ,updateTransformation);

/* --------------------------------- SECTIONS SECTION --------------------------------- */
// GET  (/sections) 
router.get('/sections', isAuth(ADMIN) , getAllSections);
// POST  (/sections) 
router.post('/sections', allowToEdit(ADMIN) , sectionValidation, addSections);
// DELETE  (/sections) 
router.delete('/sections/:id', allowToDelete(ADMIN) , deleteSections);
// PATCH  (/sections) 
router.patch('/sections/:id', allowToEdit(ADMIN) , sectionValidation  ,updateSections);




module.exports = router;
