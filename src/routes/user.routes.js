const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {login, register, processRegister, processLogin, profile, edit, processUpdate,} = require('../controllers/userControllers.js');

//Subir el archivo usando multer y su disposición como middleware
const { uploadUser } = require("../middlewares/multer");


router 
.get ('/login', login)
.post('/login', processLogin)
.get ('/register', register)
.post('/register', uploadUser.single("avatar"), processRegister)

//Vista de perfil
.get ('/profile', profile)




module.exports = router;