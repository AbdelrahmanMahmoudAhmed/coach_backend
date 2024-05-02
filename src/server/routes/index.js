const express = require('express')

// routes
const homeRouter = require('./home');
const quickAnswers = require('./quickAnswers');
const manageQuickAnswers = require('./admin/manageWebsite')

const setupApiRouters = (app) => {
    const router = express.Router();

    router.use('/', homeRouter);
    router.use('/quick-answers', quickAnswers);

    /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
    router.use('/admin/website-management', manageQuickAnswers);

    app.use('/api', router);
}


module.exports = setupApiRouters;