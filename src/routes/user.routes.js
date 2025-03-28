const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {login, register, processRegister, processLogin, profile, logout, edit, securityEdit, processUpdate,} = require('../controllers/userControllers.js');

//Subir el archivo usando multer y su disposición como middleware
const { uploadUser } = require("../middlewares/multer");
const loggedAuth = require("../middlewares/loggedAuth.js");
const guestAuth = require('../middlewares/guestAuth.js')

router 
.get ('/login', loggedAuth, login) //Redireccionamiento para usuarios ya logueados
.post('/login', processLogin)
.get ('/register', loggedAuth, register)
.post('/register', uploadUser.single("avatar"), processRegister)

//Vista de perfil
.get ('/profile', /*guestAuth,*/ profile) //Redireccionamiento para visitantes no logueados
.get('/profile/edit', edit)
.get('/profile/edit-security', securityEdit)
//Logout process
.get('/logout', guestAuth, logout)


module.exports = router;