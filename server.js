//create the server
const express =require("express");
const cors = require("cors");
const application = express();
const mysql = require("mysql2");
const port = 10000;
const{check, validationResult}= require("express-validator");
let formValidation = validateMedicationFormData();

application.use(cors({
   // origin: 'http://127.0.0.1:5500',
   origin: '*',
   methods: ['GET', 'POST'],
    credentials: true
}));

//static routing
application.use("/", express.static("./pill-mate-website/docs"));

//declaring used file
//html routing
//from express libaray
application.use(express.urlencoded({extended:false}));
//using json routing
application.use(express.json());

application.post("/dataProcessing",formValidation,(request,response)=>{
    let message={};
// creating form data using name attribute
const error = validationResult(request);

if(!error.isEmpty()){

    console.log("There had been some errors.");
    
} else{
    
    const medicationName = request.body.medicationName;
    const dosage = request.body.dosage;
    const time = request.body.time;
    const date = request.body.date;

     // Validation patterns
    const namePattern = /^[a-zA-Z\s]{2,}$/;
    const dosagePattern = /^\d+(\.\d+)?$/;  // Allow integer or decimal dosage
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    // Validation checks
    const validName = medicationName && namePattern.test(medicationName.trim());
    const validDosage = dosage && dosagePattern.test(dosage.trim());
    const validTime = time && timePattern.test(time.trim());
    const validDate = date && datePattern.test(date.trim()) && !isNaN(new Date(date).getTime());


     if (validName && validDosage && validTime && validDate){
        message ={status:true, err:""};
        addMedication(medicationName, dosage, time, date);
        //console.log(Valid submission: ${medicationName}, ${dosage}, ${time}, ${date});
    }else{
       message = { status: false, err: "Error! Please provide valid form data." };
        console.log("Invalid form submission.");
    }
    response.json(message);

    }

});

//function to add medication to the database

function addMedication(medicationName, dosage, time, date){
    let db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"medicine",
        port:3306
    });
    db.connect((err)=>{
       let sql = `INSERT INTO medication_log (medicationName, dosage, time, date) VALUES( '${medicationName}', '${dosage}','${time}', '${date}')`;

        db.query(sql,function(error,result){
            if(error) {
                throw error;
            }
            console.log("Data has been inserted successfully to the medication log.");

            db.end();
        });
    });
}
//function to validate form data
    function validateMedicationFormData() {
    return [
        check("medicationName")
            .isString().withMessage("Medication name must be a string.")
            .isLength({ min: 1, max: 100 }).withMessage("Medication name must be between 1 and 100 characters.")
            .matches(/^[A-Za-z\s]+$/).withMessage("Medication name should contain letters and spaces only.")
            .trim()
            .escape(),

        check("dosage")
            .isFloat({ min: 0.1, max: 10000 }).withMessage("Dosage must be a number between 0.1 and 10000."),

        check("time")
            .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM 24-hour format."),

        check("date")
            .isISO8601().withMessage("Date must be a valid date in YYYY-MM-DD format.")
            .custom((value) => {
                const inputDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0); // ignore time
                if (inputDate < today) {
                    throw new Error("Date cannot be in the past.");
                }
                return true;
            })
    ];
}
//server port
application.listen(port,() =>{
    console.log("server is running on port " + port);
});
