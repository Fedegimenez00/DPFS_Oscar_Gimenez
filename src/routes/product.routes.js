const express = require("express");
const router = express.Router();

const {show, create, cart} = require('../controllers/productControllers.js');

router 
.get ('/product-detail', show)
.get ('/add', create)
.get ('/cart', cart)


module.exports = router;
