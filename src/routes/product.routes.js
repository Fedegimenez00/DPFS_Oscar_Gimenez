const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {show, create, cart, getPartial, catalog, save, edit, update, destroy} = require('../controllers/productControllers.js');

//Subir el archivo usando multer (Con su disposición como middleware)
const { uploadProd } = require('../middlewares/multer')

router 
.get ('/products/detail/:courseid', show)
.get ('/products/add', create)
.post('/products/add', uploadProd.single('courseimage'), save)
.get('/products/edit/:courseid', edit)
.put('/products/edit/:courseid', uploadProd.single('courseimage'), update)
.get('/products/delete/:courseid', destroy)

.get('/cart', cart)
.get('/partial', getPartial)
.get('/products', catalog)


module.exports = router;
