const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {login, register, processRegister, processLogin, profile, logout, edit, editUpdate, courseList, courseCreate, securityEdit, securityEditUpdate, destroy, processDestroy} = require('../controllers/userControllers.js');

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
.get ('/profile/:user_id', profile) //Redireccionamiento para visitantes no logueados

//Actualización del perfil
.get('/profile/:user_id/edit', guestAuth, edit)
.put('/profile/:user_id/edit', uploadUser.single("avatar") , editUpdate)

.get('/profile/:user_id/edit-security', guestAuth, securityEdit)
.put('/profile/:user_id/edit-security', securityEditUpdate)

//Eliminación del perfil
.get ('/profile/:user_id/delete-account', guestAuth, destroy)

.get('/profile/:user_id/destroy', processDestroy)
.delete('/profile/:user_id/destroy', processDestroy)

//Cursos comprados
.get ('/profile/:user_id/my-courses', guestAuth, courseList)

//Creación de cursos
.get ('/profile/:user_id/create', guestAuth, courseCreate)
//Logout process
.get('/logout', guestAuth, logout)


module.exports = router;