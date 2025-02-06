const express = require("express");
const router = express.Router();

const {login, register, admin} = require('../controllers/userControllers.js');

router 
.get ('/login', login)
.get ('/register', register)
.get ('/admin', admin);

module.exports = router;