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
const { getLayout , updateLayout } = require('../../controller/layout')


// validation
const {addQuickAnswerValidation , updateQuickAnswerValidation } = require('../../validation/quickAnswers');
const {addTransformationValidation , updateTransformationValidation } = require('../../validation/transformation');
const sectionValidation = require('../../validation/sections');
const {addCertificationValidation , updateCertificationValidation } = require('../../validation/certifications');
const {addPackageValidation , updatePackageValidation } = require('../../validation/packages');
const {addProductValidation , updateProductValidation } = require('../../validation/product');
const {addBlogValidation , updateBlogValidation } = require('../../validation/blogs');
const {addVideoValidation , updateVideoValidation } = require('../../validation/videos');
const { manageLayout } = require('../../validation/layout');

// middlewares
const { isAuth , allowToManageWebsite} = require('../../middleware/isAuth');
const {ADMIN} = require('../../../constant/roles')
const express = require('express');

const path = require('path')


  
const router = express.Router();
/* --------------------------------- QUICK ANSWER SECTION --------------------------------- */
// GET  (/quick_answers) 
router.get('/quick-answers' , addQuickAnswerValidation, getAllQuickAnswer);
// POST  (/quick_answers) 
router.post('/quick-answers', allowToManageWebsite(ADMIN) , addQuickAnswerValidation, addQuickAnswer);
// DELETE  (/quick_answers) 
router.delete('/quick-answers/:id', allowToManageWebsite(ADMIN) ,  deleteQuickAnswer);
// PATCH  (/quick_answers) 
router.patch('/quick-answers/:id', allowToManageWebsite(ADMIN) , updateQuickAnswerValidation  ,updateQuickAnswer);


/* --------------------------------- TRANSFORMATION SECTION --------------------------------- */
// GET  (/transformations) 
router.get('/transformations' , addTransformationValidation, getAllTransformations);
// POST  (/transformations) 
router.post('/transformations',allowToManageWebsite(ADMIN), addTransformationValidation, addTransformation);
// DELETE  (/transformations) 
router.delete('/transformations/:id', allowToManageWebsite(ADMIN) ,  deleteTransformation);
// PATCH  (/transformations) 
router.patch('/transformations/:id',allowToManageWebsite(ADMIN), updateTransformationValidation  ,updateTransformation);

/* --------------------------------- SECTIONS SECTION --------------------------------- */
// GET  (/sections) 
router.get('/sections' , getAllSections);
// POST  (/sections) 
router.post('/sections', allowToManageWebsite(ADMIN) , sectionValidation, addSections);
// DELETE  (/sections) 
router.delete('/sections/:id', allowToManageWebsite(ADMIN) , deleteSections);
// PATCH  (/sections) 
router.patch('/sections/:id', allowToManageWebsite(ADMIN) , sectionValidation  ,updateSections);

/* --------------------------------- CERTIFICATIONS SECTION --------------------------------- */

// GET  (/certifications) 
router.get('/certifications'  , getAllCertifications);
// GET  (/certifications) 
router.get('/certifications/:id',  allowToManageWebsite(ADMIN) , getCertification);
// POST  (/certifications) 
router.post('/certifications/', allowToManageWebsite(ADMIN) , addCertificationValidation, addCertifications);
// // DELETE  (/certifications) 
router.delete('/certifications/:id', allowToManageWebsite(ADMIN) , deleteCertifications);
// // PATCH  (/certifications) 
router.patch('/certifications/:id', allowToManageWebsite(ADMIN) , updateCertificationValidation  ,updateCertifications);


/* --------------------------------- PACKAGES SECTION --------------------------------- */

// GET  (/packages) 
router.get('/packages/' , getPackage);
// GET  (/packages) 
router.get('/packages/:id'  , getSinglePackage);
// POST  (/packages) 
router.post('/packages/', allowToManageWebsite(ADMIN) , addPackageValidation, addPackage);
// // DELETE  (/packages) 
router.delete('/packages/:id', allowToManageWebsite(ADMIN) , deletePackage);
// // PATCH  (/packages) 
router.patch('/packages/:id', allowToManageWebsite(ADMIN) , updatePackageValidation  ,updatePackage);

/* --------------------------------- PRODUCTS SECTION --------------------------------- */
// GET  (/products-management) 
router.get('/products/' ,  getProducts);
// GET  (/products-management) 
router.get('/products/:id' ,  getSingleProduct);
// POST  (/products-management) 
router.post('/products/', allowToManageWebsite(ADMIN) , addProductValidation, addProduct);
// // DELETE  (/products-management) 
router.delete('/products/:id', allowToManageWebsite(ADMIN) , deleteProduct);
// // PATCH  (/products-management) 
router.patch('/products/:id', allowToManageWebsite(ADMIN) , updateProductValidation  ,updateProduct);

/* --------------------------------- BLOGS SECTION --------------------------------- */
// GET  (/blogs-management) 
router.get('/blogs/' , getAllBlogs );
// GET  (/blogs-management) 
router.get('/blogs/:id' ,  getSingleBlog);
// POST  (/blogs-management) 
router.post('/blogs/', allowToManageWebsite(ADMIN) , addBlogValidation, addBlog);
// // DELETE  (/blogs-management) 
router.delete('/blogs/:id', allowToManageWebsite(ADMIN) , deleteBlog);
// // PATCH  (/blogs-management) 
router.patch('/blogs/:id', allowToManageWebsite(ADMIN) , updateBlogValidation  ,updateBlog);


/* --------------------------------- VIDEOS SECTION --------------------------------- */
// GET  (/videos-management) 
router.get('/videos/' , getAllVideos );
// POST  (/videos-management) 
router.post('/videos/', allowToManageWebsite(ADMIN) , addVideoValidation, addVideo);
// // DELETE  (/videos-management) 
router.delete('/videos/:id', allowToManageWebsite(ADMIN) , deleteVideo);
// // PATCH  (/videos-management) 
router.patch('/videos/:id', allowToManageWebsite(ADMIN) , updateVideoValidation  ,updateVideo);


/* --------------------------------- CONTACT US SECTION --------------------------------- */
// GET  (/contact-us-management) 
router.get('/contact-us/' , getAllMessages );
// // DELETE  (/contact-us-management) 
router.delete('/contact-us/:id', allowToManageWebsite(ADMIN) , deleteMessage);

/* --------------------------------- LAYOUT SECTION --------------------------------- */
// GET  (/layout-management) 
router.get('/layout/' , getLayout );
// // UPDATE  (/layout-management) 
router.patch('/layout', manageLayout , allowToManageWebsite(ADMIN) , updateLayout);



module.exports = router;
