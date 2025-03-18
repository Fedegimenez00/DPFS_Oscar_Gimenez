const express = require("express");
const router = express.Router();
const path = require('path');

const {index} = require('../controllers/adminControllers.js');
const adminAuth = require('../middlewares/adminAuth.js')


router 
.get ('/admin', adminAuth, index);

module.exports = router;