const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {show, create, cart, getPartial, catalog, save, edit, update} = require('../controllers/productControllers.js');

//Subir el archivo usando multer y dónde guardarlo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/database/images/courses'));
    },
    filename: function (req, file, cb) {
      cb(null, 'course' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage })

router 
.get ('/products/detail/:courseid', show)
.get ('/products/add', create)
.post ('/products/add', upload.single('courseimage'), save)
.get('/products/edit/:courseid', edit)
.put ('/product/edit/:courseid', upload.single('courseimage'), update)
.get ('/cart', cart)
.get('/partial', getPartial)
.get('/products', catalog)


module.exports = router;
