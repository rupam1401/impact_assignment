const db_utils = require("../utilities/db_utils")

const getStudentDetails = async(req,res) =>{
    try {
        let selectStudentDetailsQuery = "select * from students_details where student_id = ?";
        let id = req.params.id;
        const studentDetails =await db_utils.selectQuery(selectStudentDetailsQuery,id);
        if(studentDetails && studentDetails.length > 0 ){
            let result = await getStudentResult(studentDetails)
            if(result > 33){
                res.send({'result': studentDetails[0]['name'] +" passed wih " + result + "%"});
            }
            else{
                res.send({'result': studentDetails[0]['name'] +" failed wih " + result + "%"});
            }
        }
        else{
            res.send({'message': "No data found for id :: " + id});
        }
    } catch (error) {
        res.send({'message': error});
    }
}

const insertStudentDetails = async(params) =>{
    let selectStudentDetailsQuery = `INSERT INTO students_details(name, age,marks1, marks2, marks3) VALUES `
    let valueClause = ""
    for (let i = 0; i < params.length; i++) {
        const student = params[i];
        // console.log("element :: ",element);
        if (student['id']!= '') {
            valueClause = valueClause + "('" + student['name'] + "',"  + student['age'] + "," + student['marks1'] + "," + student['marks2'] + "," + student['marks3'] + "),"
        }
    }
    valueClause = valueClause.substring(0, valueClause.length - 1);
    console.log(">>>>>>",selectStudentDetailsQuery + valueClause);
    let insertRes = await db_utils.insertQuery(selectStudentDetailsQuery  + valueClause);
    console.log("Data inserted :: ",insertRes);
}

const getStudentResult = async(studentDetails) =>{
    console.log(">>>",studentDetails);
    let marks1 = studentDetails[0]['marks1'];
    let marks2 = studentDetails[0]['marks2'];
    let marks3 = studentDetails[0]['marks3'];

    let percentage = (marks1 + marks2 + marks3) / 3;

    console.log("perc :: ",percentage);

    return percentage;
}

module.exports = {
    getStudentDetails : getStudentDetails,
    insertStudentDetails : insertStudentDetails
}