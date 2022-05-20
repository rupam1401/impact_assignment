var express = require('express');
var router = express.Router();
var resultController = require("../controller/result_status")
/* GET users listing. */
router.get('/', resultController.getResultStatus);

module.exports = router;
