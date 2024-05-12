const {getProducts } = require('../controller/products')

const express = require('express');



const router = express.Router();

// GET  (/products) 
router.get('/', getProducts );





module.exports = router;
