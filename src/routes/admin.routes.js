const express = require("express");
const router = express.Router();
const path = require('path');

const {index} = require('../controllers/adminControllers.js');

router 
.get ('/admin', index);

module.exports = router;