const express = require("express");
const router = express.Router();
const {index} = require('../controllers/indexControllers');

router
.get('/', index)

module.exports = router;