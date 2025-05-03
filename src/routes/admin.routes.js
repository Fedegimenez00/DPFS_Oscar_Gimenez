const express = require("express");
const router = express.Router();
const path = require('path');

const {index} = require('../controllers/adminControllers.js');
const adminAuth = require('../middlewares/adminAuth.js');
const guestAuth = require('../middlewares/guestAuth.js');

router 
.get ('/admin', guestAuth, index)


module.exports = router;