var express = require('express');
var router = express.Router();
var userController = require("../controller/students_details")
var resultController = require("../controller/result_status")
/* GET users listing. */
router.get('/:id/result', userController.getStudentDetails);
router.get('/', resultController.getResultStatus);

module.exports = router;
