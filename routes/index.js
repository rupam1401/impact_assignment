var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const { parse } = require('fast-csv');
const studentController = require('../controller/students_details')

/* GET home page. */
router.get('/', function(req, res, next) {
  // studentController.insertStudentDetails({'name':'student 1', 'age':25,'marks1':60, 'marks2':70, 'marks3':80})
  res.sendFile(__dirname + '/index.html')
});

router.post('/',async function(req, res, next) {
  try {
    if(req.files){
      console.log("file ::: ",req.files);
      var file = req.files.file;
      var filename = file.name;
      console.log("File to upload :: ",filename);
      let fileType = file.mimetype;
      if(fileType == 'text/csv'){
        file.mv('./uploads/' + filename,async function(err){
          if(err){
            res.send(err);
          }
          else{
            let rows = [];
            fs.createReadStream(path.resolve(__dirname, '../uploads/' + filename))
              .pipe(parse({ headers: true }))
              .on('error', error => console.error(error))
              .on('data', row => {
                  // console.log(row);
                  rows.push(row);
              })
              .on('end',async rowCount => {
                await studentController.insertStudentDetails(rows);
                res.send("File Uploaded and Data Inserted Successfully!!!!")
              });
          }
        })
      }
      else{
        res.send("Choose a CSV file!!!")
      }
    }
  } catch (error) {
    res.send({'errormessage': error});
  }
});
module.exports = router;
