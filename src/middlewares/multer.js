const multer = require("multer");
const path = require("path");

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../public/database/images/courses'));
  },
  filename: function (req, file, cb) {
    cb(null, 'course' + Date.now() + path.extname(file.originalname))
  }
})
*/

const storageProd = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/database/images/courses"));
  },
  filename: function (req, file, cb) {
    const fileName = "course" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/database/images/users"));
  },
  filename: function (req, file, cb) {
    const fileName = "avatar-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const uploadProd = multer({ storage: storageProd });
const uploadUser = multer({ storage: storageUser });

module.exports = {
  uploadProd,
  uploadUser,
};