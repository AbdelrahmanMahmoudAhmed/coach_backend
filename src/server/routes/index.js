const express = require('express')

// routes
const quickAnswers = require('./quickAnswers');
const transformations = require('./transformation')
const manageQuickAnswers = require('./admin/manageWebsite')
const manageAdmins = require('./admin/admins')

const setupApiRouters = (app) => {
    const router = express.Router();

    router.use('/quick-answers', quickAnswers);
    router.use('/transformations', transformations);

    /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */

    //manage website
    router.use('/admin/website-management', manageQuickAnswers);
    //manage admins
    router.use('/admin', manageAdmins);

    app.use('/api', router);
}


module.exports = setupApiRouters;