const db_utils = require("../utilities/db_utils")

const getResultStatus = async(req,res) =>{
    try {
        let result = req.query.resultStatus;
        let getResultStatusQuery = "";
        if(result.toUpperCase() == 'PASSED'){
            getResultStatusQuery = "SELECT name FROM students_details WHERE ((marks1+marks2+marks3)/3)>= 33";
        }
        else if(result.toUpperCase() == 'FAILED'){
            getResultStatusQuery = "SELECT name FROM students_details WHERE ((marks1+marks2+marks3)/3)< 33";
        }
        else{
            res.send({'message': "Enter proper status with value passed/ failed!!!"});
        }
        const resultStatus =await db_utils.selectQuery(getResultStatusQuery,result);
        if(resultStatus && resultStatus.length > 0 ){
            let finalArr = [];
            resultStatus.forEach(element => {
                    finalArr.push(element.name)
                });
                res.send({'result': finalArr});
        }
        else{
            res.send({'message': "No data found for status :: " + result});
        }  
    } catch (error) {
        res.send({'errormessage': error});
    }
}

module.exports = {
    getResultStatus : getResultStatus
}