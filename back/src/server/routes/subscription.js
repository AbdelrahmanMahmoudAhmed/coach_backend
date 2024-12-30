const { addSubscription } = require('../controller/subscription')
const { addSubscriptionValidation } = require("../validation/subscription")
const express = require('express');



const router = express.Router();

// POST  (/contact-us) 
router.post('/', addSubscriptionValidation , addSubscription );





module.exports = router;