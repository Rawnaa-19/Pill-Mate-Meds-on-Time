// // //create the server
// // const express =require("express");
// // const cors = require("cors");
// // const application = express();
// // const mysql = require("mysql2");
// // const port = 1000;
// // const{check, validationResult}= require("express-validator");
// // let formValidation = validateMedicationFormData();

// // application.use(cors({
// //    // origin: 'http://127.0.0.1:5500',
// //    origin: '*',
// //    methods: ['GET', 'POST'],
// //     credentials: true
// // }));

// // //static routing
// // application.use("/",express.static("./docs"));

// // //declaring used file
// // //html routing
// // //from express libaray
// // application.use(express.urlencoded({extended:false}));
// // //using json routing
// // application.use(express.json());

// // application.post("/dataProcessing",formValidation,(request,response)=>{
// //     let message={};
// // // creating form data using name attribute
// // const error = validationResult(request);

// // if(!error.isEmpty()){

// //     console.log("There had been some errors.");
    
// // } else{
    
// //     const medicationName = request.body.medicationName;
// //     const dosage = request.body.dosage;
// //     const time = request.body.time;
// //     const date = request.body.date;

// //      // Validation patterns
// //     const namePattern = /^[a-zA-Z\s]{2,}$/;
// //     const dosagePattern = /^\d+(\.\d+)?$/;  // Allow integer or decimal dosage
// //     const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
// //     const datePattern = /^\d{4}-\d{2}-\d{2}$/;

// //     // Validation checks
// //     const validName = medicationName && namePattern.test(medicationName.trim());
// //     const validDosage = dosage && dosagePattern.test(dosage.trim());
// //     const validTime = time && timePattern.test(time.trim());
// //     const validDate = date && datePattern.test(date.trim()) && !isNaN(new Date(date).getTime());


// //      if (validName && validDosage && validTime && validDate){
// //         message ={status:true, err:""};
// //         addMedication(medicationName, dosage, time, date);
// //         console.log(Valid submission: ${medicationName}, ${dosage}, ${time}, ${date});
// //     }else{
// //        message = { status: false, err: "Error! Please provide valid form data." };
// //         console.log("Invalid form submission.");
// //     }
// //     response.json(message);

// //     }

// // });

// // //function to add medication to the database

// // function addMedication(medicationName, dosage, time, date){
// //     let db = mysql.createConnection({
// //         host:"localhost",
// //         user:"root",
// //         password:"",
// //         database:"medicine",
// //         port:3306
// //     });
// //     db.connect((err)=>{
// //         let sql = INSERT INTO medication_log (medicationName, dosage, time, date) VALUES( '${medicationName}', '${dosage}','${time}', '${date}');

// //         db.query(sql,function(error,result){
// //             if(error) {
// //                 throw error;
// //             }
// //             console.log("Data has been inserted successfully to the medication log.");

// //             db.end();
// //         });
// //     });
// // }
// // //function to validate form data
// //     function validateMedicationFormData() {
// //     return [
// //         check("medicationName")
// //             .isString().withMessage("Medication name must be a string.")
// //             .isLength({ min: 1, max: 100 }).withMessage("Medication name must be between 1 and 100 characters.")
// //             .matches(/^[A-Za-z\s]+$/).withMessage("Medication name should contain letters and spaces only.")
// //             .trim()
// //             .escape(),

// //         check("dosage")
// //             .isFloat({ min: 0.1, max: 10000 }).withMessage("Dosage must be a number between 0.1 and 10000."),

// //         check("time")
// //             .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM 24-hour format."),

// //         check("date")
// //             .isISO8601().withMessage("Date must be a valid date in YYYY-MM-DD format.")
// //             .custom((value) => {
// //                 const inputDate = new Date(value);
// //                 const today = new Date();
// //                 today.setHours(0, 0, 0, 0); // ignore time
// //                 if (inputDate < today) {
// //                     throw new Error("Date cannot be in the past.");
// //                 }
// //                 return true;
// //             })
// //     ];
// // }
// // //server port
// // application.listen(port,() =>{
// //     console.log("server is running on port " + port);
// // });


// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");
// const { check, validationResult } = require("express-validator");

// const application = express();
// const port = 1000;

// // Validation middleware
// function validateMedicationFormData() {
//     return [
//         check("medicationName")
//             .isString().withMessage("Medication name must be a string.")
//             .isLength({ min: 1, max: 100 }).withMessage("Medication name must be between 1 and 100 characters.")
//             .matches(/^[A-Za-z\s]+$/).withMessage("Medication name should contain letters and spaces only.")
//             .trim()
//             .escape(),

//         check("dosage")
//             .isFloat({ min: 0.1, max: 10000 }).withMessage("Dosage must be a number between 0.1 and 10000."),

//         check("time")
//             .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Time must be in HH:MM 24-hour format."),

//         check("date")
//             .isISO8601().withMessage("Date must be a valid date in YYYY-MM-DD format.")
//             .custom((value) => {
//                 const inputDate = new Date(value);
//                 const today = new Date();
//                 today.setHours(0, 0, 0, 0);
//                 if (inputDate < today) {
//                     throw new Error("Date cannot be in the past.");
//                 }
//                 return true;
//             })
//     ];
// }

// // MySQL Insert Function with placeholders to prevent SQL Injection
// function addMedication(medicationName, dosage, time, date) {
//     const db = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "medicine",
//         port: 3306
//     });

//     db.connect((err) => {
//         if (err) throw err;

//         const sql = INSERT INTO medication_log (medicationName, dosage, time, date) VALUES (?, ?, ?, ?);
//         db.query(sql, [medicationName, dosage, time, date], (error, result) => {
//             if (error) throw error;
//             console.log("Data inserted successfully into medication_log.");
//             db.end();
//         });
//     });
// }

// // Middleware
// application.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST'],
//     credentials: true
// }));
// application.use("/", express.static("./docs"));
// application.use(express.urlencoded({ extended: false }));
// application.use(express.json());

// // POST Route with Validation
// application.post("/dataProcessing", validateMedicationFormData(), (request, response) => {
//     const errors = validationResult(request);
//     if (!errors.isEmpty()) {
//         console.log("Validation errors:", errors.array());
//         return response.status(400).json({ status: false, errors: errors.array() });
//     }

//     const { medicationName, dosage, time, date } = request.body;
//     addMedication(medicationName, dosage, time, date);
//     response.json({ status: true, message: "Medication added successfully." });
// });

// // Server Start
// application.listen(port, () => {
//     console.log("Server running on port " + port);
// });
//   js:const form = document.getElementById("myform");



// //adding an event listener that is triggered by submission
// form.addEventListener("submit", function(event) {
//     //stops submission before validation
//     event.preventDefault();

    
//     //read user input

//     const medicationName = document.getElementsByName("medicationName")[0].value.trim();
//     const dosage = document.getElementsByName("dosage")[0].value.trim();
//     const time = document.getElementsByName("time")[0];
//     const date = document.getElementsByName("date")[0];
//     const submit = document.getElementById("submit");
//     const reset = document.getElementById("reset");

//     const validFormData = validateform(medicationName, dosage, time, date);

//     if(validFormData){

//     fetch("http://localhost:4000/dataProcessing",{
//         //sending 3 objects
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body:JSON.stringify({ //data enterned by user
//             medicationName:medicationName,
//             dosage:dosage,
//             time:time.value,
//             date:date.value
//         }),
//     })
//     .then(function(response){
//         if(response.ok){
//             return response.json(); //convert to json

//         }else{
//             throw new Error("Oppss! Network response was interrupted.");
//         }
//     })
//     .then(function(data){
        
//         if(data.status){
//             document.getElementById("confirmation-message").innerHTML = "<span style='background-color:#f4e8d0; color:#003049;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'>Thank you for using PillMate!</span>";
//         }else{
//             throw new Error(data.err);
//         }
//     })
    
//     .catch(function(error){
//         document.getElementById("confirmation-message").innerHTML = "<span style='color:red; background-color:#f4e8d0;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'>Sorry! There seems to be an error.</span>";
//     }
//     );
// }
// else{
//     alert("Please fill out the form correctly.");
// }

// });
// function validateForm(medicationName, dosage, time, date) {
//     const errorMessages = [
//         "The medication name must be at least 2 characters long and contain only letters.",
//         "The dosage must be provided and must be a number.",
//         "The time must be selected in HH:MM format.",
//         "The date must be selected in YYYY-MM-DD format.",
//     ];

//     // Medication name: at least 2 letters, only letters allowed
//     if (medicationName.length < 2 || !/^[a-zA-Z\s]+$/.test(medicationName)) {
//         alert(errorMessages[0]);
//         return false;
//     }

//     // Dosage: must be a number (integer or decimal), at least 1 character
//     if (dosage.trim() === "" || isNaN(dosage)) {
//         alert(errorMessages[1]);
//         return false;
//     }

//     // Time: must match HH:MM 24-hour format
//     if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
//         alert(errorMessages[2]);
//         return false;
//     }

//     // Date: must be valid date in YYYY-MM-DD format
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(date).getTime())) {
//         alert(errorMessages[3]);
//         return false;
//     }

//     return true;
// }