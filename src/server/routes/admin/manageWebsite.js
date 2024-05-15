// controllers
const { getAllQuickAnswer,addQuickAnswer, deleteQuickAnswer , updateQuickAnswer } = require('../../controller/quickAnswers')
const { getAllTransformations, addTransformation, updateTransformation,deleteTransformation } = require('../../controller/transformation')
const { getAllSections, addSections, updateSections,deleteSections } = require('../../controller/sections')
const {getCertification, getAllCertifications  , deleteCertifications , updateCertifications, addCertifications  } = require('../../controller/certifications')
const { getPackage , getSinglePackage , deletePackage , updatePackage, addPackage  } = require('../../controller/packages')
const { getProducts , getSingleProduct , deleteProduct , updateProduct , addProduct  } = require('../../controller/products');
const { getAllBlogs ,getSingleBlog , addBlog , deleteBlog , updateBlog} = require('../../controller/blogs');
const { getAllVideos ,addVideo , deleteVideo , updateVideo} = require('../../controller/videos');
const { getAllMessages , deleteMessage} = require('../../controller/contactUs');


// validation
const {addQuickAnswerValidation , updateQuickAnswerValidation } = require('../../validation/quickAnswers');
const {addTransformationValidation , updateTransformationValidation } = require('../../validation/transformation');
const sectionValidation = require('../../validation/sections');
const {addCertificationValidation , updateCertificationValidation } = require('../../validation/certifications');
const {addPackageValidation , updatePackageValidation } = require('../../validation/packages');
const {addProductValidation , updateProductValidation } = require('../../validation/product');
const {addBlogValidation , updateBlogValidation } = require('../../validation/blogs');
const {addVideoValidation , updateVideoValidation } = require('../../validation/videos');

// middlewares
const {  allowToDelete , allowToEdit , isAuth} = require('../../middleware/isAuth');
const {ADMIN} = require('../../../constant/roles')
const express = require('express');

const path = require('path')


  
const router = express.Router();







/* --------------------------------- QUICK ANSWER SECTION --------------------------------- */
// GET  (/quick_answers) 
router.get('/quick-answers',isAuth(ADMIN) , addQuickAnswerValidation, getAllQuickAnswer);
// POST  (/quick_answers) 
router.post('/quick-answers', allowToEdit(ADMIN) , addQuickAnswerValidation, addQuickAnswer);
// DELETE  (/quick_answers) 
router.delete('/quick-answers/:id', allowToDelete(ADMIN) ,  deleteQuickAnswer);
// PATCH  (/quick_answers) 
router.patch('/quick-answers/:id', allowToEdit(ADMIN) , updateQuickAnswerValidation  ,updateQuickAnswer);


/* --------------------------------- TRANSFORMATION SECTION --------------------------------- */
// GET  (/transformations) 
router.get('/transformations',isAuth(ADMIN) , addTransformationValidation, getAllTransformations);
// POST  (/transformations) 
router.post('/transformations',allowToEdit(ADMIN), addTransformationValidation, addTransformation);
// DELETE  (/transformations) 
router.delete('/transformations/:id', allowToDelete(ADMIN) ,  deleteTransformation);
// PATCH  (/transformations) 
router.patch('/transformations/:id',allowToEdit(ADMIN), updateTransformationValidation  ,updateTransformation);

/* --------------------------------- SECTIONS SECTION --------------------------------- */
// GET  (/sections) 
router.get('/sections', isAuth(ADMIN) , getAllSections);
// POST  (/sections) 
router.post('/sections', allowToEdit(ADMIN) , sectionValidation, addSections);
// DELETE  (/sections) 
router.delete('/sections/:id', allowToDelete(ADMIN) , deleteSections);
// PATCH  (/sections) 
router.patch('/sections/:id', allowToEdit(ADMIN) , sectionValidation  ,updateSections);

/* --------------------------------- CERTIFICATIONS SECTION --------------------------------- */

// GET  (/certifications) 
router.get('/certifications',isAuth(ADMIN)  , getAllCertifications);
// GET  (/certifications) 
router.get('/certifications/:id',  allowToEdit(ADMIN) , getCertification);
// POST  (/certifications) 
router.post('/certifications/', allowToEdit(ADMIN) , addCertificationValidation, addCertifications);
// // DELETE  (/certifications) 
router.delete('/certifications/:id', allowToDelete(ADMIN) , deleteCertifications);
// // PATCH  (/certifications) 
router.patch('/certifications/:id', allowToEdit(ADMIN) , updateCertificationValidation  ,updateCertifications);


/* --------------------------------- PACKAGES SECTION --------------------------------- */

// GET  (/packages) 
router.get('/packages/',isAuth(ADMIN) , getPackage);
// GET  (/packages) 
router.get('/packages/:id',isAuth(ADMIN)  , getSinglePackage);
// POST  (/packages) 
router.post('/packages/', allowToEdit(ADMIN) , addPackageValidation, addPackage);
// // DELETE  (/packages) 
router.delete('/packages/:id', allowToDelete(ADMIN) , deletePackage);
// // PATCH  (/packages) 
router.patch('/packages/:id', allowToEdit(ADMIN) , updatePackageValidation  ,updatePackage);

/* --------------------------------- PRODUCTS SECTION --------------------------------- */
// GET  (/products-management) 
router.get('/products/',isAuth(ADMIN) ,  getProducts);
// GET  (/products-management) 
router.get('/products/:id',isAuth(ADMIN) ,  getSingleProduct);
// POST  (/products-management) 
router.post('/products/', allowToEdit(ADMIN) , addProductValidation, addProduct);
// // DELETE  (/products-management) 
router.delete('/products/:id', allowToDelete(ADMIN) , deleteProduct);
// // PATCH  (/products-management) 
router.patch('/products/:id', allowToEdit(ADMIN) , updateProductValidation  ,updateProduct);

/* --------------------------------- BLOGS SECTION --------------------------------- */
// GET  (/blogs-management) 
router.get('/blogs/',isAuth(ADMIN) , getAllBlogs );
// GET  (/blogs-management) 
router.get('/blogs/:id',isAuth(ADMIN) ,  getSingleBlog);
// POST  (/blogs-management) 
router.post('/blogs/', allowToEdit(ADMIN) , addBlogValidation, addBlog);
// // DELETE  (/blogs-management) 
router.delete('/blogs/:id', allowToDelete(ADMIN) , deleteBlog);
// // PATCH  (/blogs-management) 
router.patch('/blogs/:id', allowToEdit(ADMIN) , updateBlogValidation  ,updateBlog);


/* --------------------------------- VIDEOS SECTION --------------------------------- */
// GET  (/videos-management) 
router.get('/videos/',isAuth(ADMIN) , getAllVideos );
// POST  (/videos-management) 
router.post('/videos/', allowToEdit(ADMIN) , addVideoValidation, addVideo);
// // DELETE  (/videos-management) 
router.delete('/videos/:id', allowToDelete(ADMIN) , deleteVideo);
// // PATCH  (/videos-management) 
router.patch('/videos/:id', allowToEdit(ADMIN) , updateVideoValidation  ,updateVideo);


/* --------------------------------- CONTACT US SECTION --------------------------------- */
// GET  (/videos-management) 
router.get('/contact-us/',isAuth(ADMIN) , getAllMessages );
// // DELETE  (/videos-management) 
router.delete('/contact-us/:id', allowToDelete(ADMIN) , deleteMessage);



module.exports = router;
