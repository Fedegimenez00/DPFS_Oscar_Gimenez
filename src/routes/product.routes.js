const express = require("express");
const router = express.Router();

const {show, create, cart, getPartial, catalog} = require('../controllers/productControllers.js');

router 
.get ('/product-detail', show)
.get ('/products/add', create)
.get ('/cart', cart)
.get('/partial', getPartial)
.get('/products', catalog);



module.exports = router;
