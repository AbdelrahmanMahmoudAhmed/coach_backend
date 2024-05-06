const express = require('express')

// routes
const quickAnswers = require('./quickAnswers');
const transformations = require('./transformation')
const manageQuickAnswers = require('./admin/manageWebsite')

const setupApiRouters = (app) => {
    const router = express.Router();

    router.use('/quick-answers', quickAnswers);
    router.use('/transformations', transformations);

    /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
    router.use('/admin/website-management', manageQuickAnswers);

    app.use('/api', router);
}


module.exports = setupApiRouters;