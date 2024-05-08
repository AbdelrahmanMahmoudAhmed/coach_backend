const express = require('express')

// routes
const quickAnswers = require('./quickAnswers');
const transformations = require('./transformation')
const manageQuickAnswers = require('./admin/manageWebsite')
const manageAdmins = require('./admin/admins')
const adminAuth = require('./admin/auth')
const { ADMIN , CLIENT } =  require('../../constant/roles')
const {isAuth} = require('../middleware/isAuth')
const setupApiRouters = (app) => {
    const router = express.Router();

    router.use('/quick-answers', quickAnswers);
    router.use('/transformations', transformations);

    /* ------------------------------- ADMIN MANAGEMENT ------------------------------- */
    // admin auth
    router.use('/admin' , adminAuth);
    //manage website
    router.use('/admin/website-management', isAuth(ADMIN) ,manageQuickAnswers);
    //manage admins
    router.use('/admin', isAuth(ADMIN), manageAdmins);


    app.use('/api', router);
}


module.exports = setupApiRouters;