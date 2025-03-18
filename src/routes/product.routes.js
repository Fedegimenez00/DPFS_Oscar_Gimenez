const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {show, create, cart, getPartial, catalog, save, edit, update, destroy} = require('../controllers/productControllers.js');

//Subir el archivo usando multer (Con su disposición como middleware)
const { uploadProd } = require('../middlewares/multer')
const guestAuth = require('../middlewares/guestAuth.js')

router 
.get ('/products/detail/:courseid', show)
.get ('/products/add', guestAuth, create)
.post('/products/add', uploadProd.single('courseimage'), save)
.get('/products/edit/:courseid', guestAuth, edit)
.put('/products/edit/:courseid', uploadProd.single('courseimage'), update)
.get('/products/delete/:courseid', guestAuth, destroy)

.get('/cart', cart)
.get('/partial', getPartial)
.get('/products', catalog)


module.exports = router;
