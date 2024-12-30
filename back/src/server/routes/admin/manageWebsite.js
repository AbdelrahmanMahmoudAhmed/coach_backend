// controllers
const {    getPanelSettings , updateSettings  } = require('../../controller/settings')
const {  getAboutUs  , updateAbout , addAchevement , updateAchevement , deleteAchevement} = require('../../controller/aboutUS')
const {   getSingleFeedback, getAllFeedbacks   , addFeedback, updateFeedback , deleteFeedback} = require("../../controller/feedback")
const { getSingleSubscription ,getAllSubscriptions, deleteSubscription , sendingEmails} = require('../../controller/subscription')
const { getSingleService, getAllServices, addService , updateService , deleteService } = require("../../controller/services")
const { getAllFeaturess, addFeatures , updateFeatures , deleteFeatures } = require("../../controller/feature")
const { getSingleProject,getAllProjects , updateProject , updateProjectFeedback , deleteProject, addProject } = require("../../controller/project")
const { getAllMessages , deleteMessage } = require("../../controller/contactUs")

// validation
const {addFeedbackValidation , updateFeedbackValidation } = require('../../validation/feedback');
const { settingsValidation , aboutValidation } = require('../../validation/settings')
const { addAchevementValidation , updateAchevementValidation } = require('../../validation/achevement')
const { sendEmailValidation  } = require("../../validation/subscription")
const {  addServiceValidation , updateServiceValidation } = require("../../validation/service")
const {  addFeaturesValidation , updateFeaturesValidation } = require("../../validation/feature")
const {  addProjectValidation , updateProjectValidation  , updateProjectFeedbackValidation } = require("../../validation/project")

// middlewares
const {ADMIN} = require('../../../constant/roles')
const express = require('express');

const path = require('path');
const router = express.Router();



/* --------------------------------- SETTINGS SECTION --------------------------------- */

router.get('/settings' , getPanelSettings);
router.patch('/settings' , settingsValidation , updateSettings);

/* --------------------------------- ABOUT US SECTION --------------------------------- */

router.get('/about' , getAboutUs);
router.patch('/about' , aboutValidation , updateAbout);

router.post('/achevement' , addAchevementValidation , addAchevement);
router.patch('/achevement/:id' , updateAchevementValidation , updateAchevement);
router.delete('/achevement/:id'  , deleteAchevement);
/* --------------------------------- FEEDBACK SECTION --------------------------------- */

router.get('/feedback/:id' , getSingleFeedback);
router.get('/feedback' , getAllFeedbacks);
router.post('/feedback' , addFeedbackValidation , addFeedback);
router.patch('/feedback/:id' , updateFeedbackValidation , updateFeedback);
router.delete('/feedback/:id'  , deleteFeedback);

/* --------------------------------- SUBSCRIPTION SECTION --------------------------------- */

router.get('/subscription/:id' , getSingleSubscription);
router.get('/subscription' , getAllSubscriptions);
router.delete('/subscription/:id'  , deleteSubscription);
router.post('/subscription/send-emails' ,sendEmailValidation  , sendingEmails);

/* --------------------------------- SERVICES SECTION --------------------------------- */

router.get('/services/:id' , getSingleService);
router.get('/services' , getAllServices);
router.post('/services' , addServiceValidation , addService);
router.patch('/services/:id' , updateServiceValidation , updateService);
router.delete('/services/:id'  , deleteService);
/* --------------------------------- FEATURES SECTION --------------------------------- */

router.get('/services/:serviceId/features' , getAllFeaturess);
router.post('/services/:serviceId/features' , addFeaturesValidation , addFeatures);
router.patch('/services/:serviceId/features/:id' , updateFeaturesValidation , updateFeatures);
router.delete('/services/:serviceId/features/:id'  , deleteFeatures);

/* --------------------------------- PROJECTS SECTION --------------------------------- */

router.get('/project/:id' , getSingleProject);
router.get('/project' , getAllProjects);
router.post('/project' , addProjectValidation , addProject);
router.patch('/project/:id' , updateProjectValidation , updateProject);
router.patch('/project/:id/feedback'  , updateProjectFeedbackValidation ,updateProjectFeedback);
router.delete('/project/:id'  , deleteProject);

/* --------------------------------- CONTACT US SECTION --------------------------------- */

router.get('/contact-us' , getAllMessages);
router.delete('/contact-us/:id'  , deleteMessage);












module.exports = router;
