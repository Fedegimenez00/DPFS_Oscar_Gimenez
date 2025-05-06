const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {show, create, cart, getPartial, catalog, search, save, edit, update, destroy} = require('../controllers/productControllers.js');

//Subir el archivo usando multer (Con su disposición como middleware)
const { uploadProd } = require('../middlewares/multer')
const guestAuth = require('../middlewares/guestAuth.js')
const {
    productAddValidator,
    productEditValidator,
  } = require("../middlewares/validator.js");
router 
.get ('/products/detail/:id', show)
.get ('/products/add', guestAuth, create)
.post('/products/add', uploadProd.single('image'), productAddValidator, save)
.get('/products/edit/:id', guestAuth, edit)
.put('/products/edit/:id', uploadProd.single('image'), productEditValidator, update)

.delete('/products/delete/:id', guestAuth, destroy)

.get('/cart', cart)
.get('/partial', getPartial)
.get('/products', catalog)
.get('/products/search', search)



module.exports = router;
