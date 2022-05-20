# impact_assignment
Assignment for 2nd round of Impact Run

# Install and Run the project
1. Clone the project from github using command : git clone https://github.com/rupam1401/impact_assignment.git
2. Change directory to main folder using command : cd impact_assignment
2. Run command to install dependenciesand node modules : npm install
3. Run command to start the project : npm start
4. Test the apis using postman tool

APIs:
1. http://localhost:3000/ : To uplaod the csv file to 'uploads' folder and insert the data into the      students table.
    Validation used : 
        User must choose a CSV file or else he/ she will get an message saying "Choose a CSV file!!!"

2. http://localhost:3000/students/?resultStatus=passed : To get the array of names of students passed (with more than 33 %) or failed (less than 33%)
    Validation used : 
        resultStatus must be entered as 'passed' or 'failed' or else it will send the message as "Enter proper status with value passed/ failed!!!"

3. http://localhost:3000/students/0/result : To get the result of student along with the percent scored and if the student id is not found then the message returned is "No data found for id :: 0"