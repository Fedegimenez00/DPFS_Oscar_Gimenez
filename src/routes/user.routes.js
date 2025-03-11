const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path')

const {login, register, save} = require('../controllers/userControllers.js');

//Subir el archivo usando multer y dónde guardarlo
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/database/images/users'));
    },
    filename: function (req, file, cb) {
      cb(null, 'user' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage })

router 
.get ('/login', login)
.get ('/register', register)
.post('/register', save) //upload.single('avatar'), save)



module.exports = router;