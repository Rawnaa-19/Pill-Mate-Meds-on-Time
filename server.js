// //create the server
// const express =require("express");
// const cors = require("cors");
// const application = express();
// const mysql = require("mysql2");
// const port = 10000;
// const{check, validationResult}= require("express-validator");
// let formValidation = validateMedicationFormData();

// application.use(cors({
//    // origin: 'http://127.0.0.1:5500',
//    origin: '*',
//    methods: ['GET', 'POST'],
//     credentials: true
// }));

// //static routing
// application.use("/", express.static("./pill-mate-website/docs"));

// //declaring used file
// //html routing
// //from express libaray
// application.use(express.urlencoded({extended:false}));
// //using json routing
// application.use(express.json());

// application.post("/dataProcessing",formValidation,(request,response)=>{
//     let message={};
// // creating form data using name attribute
// const error = validationResult(request);

// if(!error.isEmpty()){

//     console.log("There had been some errors.");
    
// } else{
    
//     const medicationName = request.body.medicationName;
//     const dosage = request.body.dosage;
//     const time = request.body.time;
//     const date = request.body.date;
//     const frequencyInput = request.body.frequencyInput;
//     const medType = request.body.medType;
//     const startDate = request.body.startDate;
//     const endDate = request.body.endDate;
//     const reminderToggle = request.body.reminderToggle;


//      // Validation patterns
//     const namePattern = /^[a-zA-Z\s]{2,}$/;
//     const dosagePattern = /^\d+(\.\d+)?$/;  // Allow integer or decimal dosage
//     const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;

//     // Validation checks
//     const validName = medicationName && namePattern.test(medicationName.trim());
//     const validDosage = dosage && dosagePattern.test(dosage.trim());
//     const validTime = time && timePattern.test(time.trim());
//     const validDate = date && datePattern.test(date.trim()) && !isNaN(new Date(date).getTime());


//      if (validName && validDosage && validTime && validDate){
//     addMedication(medicationName, dosage, time, date, function(insertedId) {
//         if (insertedId) {
//             message = {
//                 status: true,
//                 id: insertedId,
//                 err: ""
//             };
//         } else {
//             message = {
//                 status: false,
//                 err: "Database error. Please try again."
//             };
//         }
//         response.json(message);
//     });
// } else {
//     message = {
//         status: false,
//         err: "Error! Please provide valid form data."
//     };
//     response.json(message);

// }
// }
// });

// //function to add medication to the database



// function addMedication(medicationName, dosage, time, date, frequencyInput, medType, startDate, endDate, reminderToggle, callback) {
//     let db = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "medicine",
//         port: 3306
//     });

//     db.connect((err) => {
//         if (err) {
//             console.error("Connection error:", err);
//             callback(null);
//             return;
//         }

//         const sql = `INSERT INTO medication_log 
//             (medicationName, dosage, time, date, frequencyInput, medType, startDate, endDate, reminderToggle) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//         const values = [medicationName, dosage, time, date, frequencyInput, medType, startDate, endDate, reminderToggle];

//         db.query(sql, values, function(error, result) {
//             if (error) {
//                 console.error("Insert error:", error);
//                 callback(null);
//             } else {
//                 console.log("✅ Medication saved with ID:", result.insertId);
//                 callback(result.insertId);
//             }
//             db.end();
//         });
//     });
// }


// //function to get medication data
// application.get("/meds/today", (request, response) => {
//     const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
    
//     let db = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "medicine",
//         port: 3306
//     });

//     db.connect((err) => {
//         if (err) return res.status(500).json({ error: "Database connection failed." });

//         const query = `SELECT * FROM medication_log WHERE date = ?`;
//         db.query(query, [today], (error, results) => {
//             if (error) {
//                 return res.status(500).json({ error: error.message });
//             }
//             res.json(results);
//             db.end();
//         });
//     });
// });

// //function to check if med has been taken
//  application.post("/medications/log", (req, res) => {
//     const { medicationName, status, timestamp } = req.body;

//     const sql = "INSERT INTO medication_logs (medicationName, status, timestamp) VALUES (?, ?, ?)";
//     const values = [medicationName, status, timestamp];

//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error("Error inserting medication log:", err);
//             return res.status(500).json({ error: "Failed to log medication" });
//         }
//         res.status(200).json({ message: "Medication log saved successfully" });
//     });
// });

// //function to get medication info from db
// application.get("/medications/names", (req, res) => {
//     const sql = "SELECT medicationName FROM medications"; // Change table name if different

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error("Error fetching medication names:", err);
//             return res.status(500).json({ error: "Failed to fetch medication names" });
//         }

//         const names = results.map(row => row.medicationName);
//         res.status(200).json(names);
//     });
// });

// //function to validate form data
//     function validateMedicationFormData() {
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
//                 today.setHours(0, 0, 0, 0); // ignore time
//                 if (inputDate < today) {
//                     throw new Error("Date cannot be in the past.");
//                 }
//                 return true;
//             })
//     ];
// }

// //function to return med log

// //server port
// application.listen(port,() =>{
//     console.log("server is running on port " + port);
// });



const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { check, validationResult } = require("express-validator");

const application = express();
const port = 10000;

// Middleware
application.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
application.use("/", express.static("./pill-mate-website/docs"));
application.use(express.urlencoded({ extended: false }));
application.use(express.json());

// Validation rules
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

        check("medType").isIn(["tablet", "capsule", "syrup", "sublingual", "ointment"]).withMessage("Invalid medication type."),
        check("frequencyInput").optional().isString().trim().escape(),
        check("reminderToggle").optional().isBoolean()
    ];
}

const formValidation = validateMedicationFormData();

// POST route
application.post("/dataProcessing", formValidation, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return response.json({
            status: false,
            err: errors.array()
        });
    }

    const {
        medicationName,
        dosage,
        time,
        frequencyInput,
        medType,
        startDate,
        endDate,
        reminderToggle
    } = request.body;

    addMedication(
        medicationName,
        dosage,
        time,
        frequencyInput,
        medType,
        startDate,
        endDate,
        reminderToggle,
        function (insertedId) {
            if (insertedId) {
                response.json({ status: true, id: insertedId, err: "" });
            } else {
                response.json({ status: false, err: "Database error. Please try again." });
            }
        }
    );
});

// Add medication to DB
function addMedication(medicationName, dosage, time,  frequencyInput, medType, startDate, endDate, reminderToggle, callback) {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "medicine",
        port: 3306
    });

    db.connect((err) => {
        if (err) {
            console.error("Connection error:", err);
            callback(null);
            return;
        }

        const sql = `INSERT INTO medication_log 
            (medicationName, dosage, time, frequencyInput, medType, startDate, endDate, reminderToggle) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [medicationName, dosage, time,  frequencyInput, medType, startDate, endDate, reminderToggle];

        db.query(sql, values, function (error, result) {
            if (error) {
                console.error("Insert error:", error);
                callback(null);
            } else {
                console.log("✅ Medication saved with ID:", result.insertId);
                callback(result.insertId);
            }
            db.end();
        });
    });
}


// Start server
application.listen(port, () => {
    console.log("🚀 Server is running on port " + port);
});
