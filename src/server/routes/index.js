const express = require('express')

// routes
const homeRouter = require('./home');
const quickAnswers = require('./quickAnswers');

const setupApiRouters = (app) => {
    const router = express.Router();

    router.use('/', homeRouter);
    router.use('/quick_answers', quickAnswers);
    app.use('/api', router);
}


module.exports = setupApiRouters;