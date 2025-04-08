const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {login, register, processRegister, processLogin, profile, logout, edit, courseList, courseCreate, securityEdit, processUpdate, destroy} = require('../controllers/userControllers.js');

//Subir el archivo usando multer y su disposición como middleware
const { uploadUser } = require("../middlewares/multer");
const loggedAuth = require("../middlewares/loggedAuth.js");
const guestAuth = require('../middlewares/guestAuth.js')
//const userLogged = require('../middlewares/userLogged.js')

router 
.get ('/login', loggedAuth, login) //Redireccionamiento para usuarios ya logueados
.post('/login', processLogin)
.get ('/register', loggedAuth, register)
.post('/register', uploadUser.single("avatar"), processRegister)

//Vista de perfil
.get ('/profile/:user_id', /*guestAuth,*/ profile) //Redireccionamiento para visitantes no logueados
.get('/profile/edit', guestAuth, edit)
.get('/profile/edit-security', guestAuth, securityEdit)
.get ('/profile/delete-account', guestAuth, destroy)
.get ('/profile/my-courses', guestAuth, courseList)
.get ('/profile/create', guestAuth, courseCreate)
//Logout process
.get('/logout', guestAuth, logout)


module.exports = router;