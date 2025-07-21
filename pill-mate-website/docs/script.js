const form = document.getElementById("myform");



//adding an event listener that is triggered by submission
form.addEventListener("submit", function(event) {
    //stops submission before validation
    event.preventDefault();

    
    //read user input

    const medicationName = document.getElementsByName("medicationName")[0].value.trim();
    const dosage = document.getElementsByName("dosage")[0].value.trim();
    const time = document.getElementsByName("time")[0];
    const date = document.getElementsByName("date")[0];
    const submit = document.getElementById("submit");
    const reset = document.getElementById("reset");

    const validFormData = validateform(medicationName, dosage, time, date);

    if(validFormData){

    fetch("http://localhost:1000/dataProcessing",{
        //sending 3 objects
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ //data enterned by user
            medicationName:medicationName,
            dosage:dosage,
            time:time.value,
            date:date.value
        }),
    })
    .then(function(response){
        if(response.ok){
            return response.json(); //convert to json

        }else{
            throw new Error("Oppss! Network response was interrupted.");
        }
    })
    .then(function(data){
        
        if(data.status){
            document.getElementById("confirmation-message").innerHTML = "<span style='background-color:#f4e8d0; color:#003049;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'> Medication has been successfully addeed!! <br> Thank you for using PillMate! We appreciate your support and look forward to serving you better.</span>";
        }else{
            throw new Error(data.err);
        }
    })
    
    .catch(function(error){
        document.getElementById("confirmation-message").innerHTML = "<span style='color:red; background-color:#f4e8d0;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'>Sorry! There seems to be an error.</span>";
    }
    );
}
else{
    alert("Please fill out the form correctly.");
}

});
function validateForm(medicationName, dosage, time, date) {
    const errorMessages = [
        "The medication name must be at least 2 characters long and contain only letters.",
        "The dosage must be provided and must be a number.",
        "The time must be selected in HH:MM format.",
        "The date must be selected in YYYY-MM-DD format. Please ensure that the date isn't in the past or invalid."
    ];

    // Medication name: at least 2 letters, only letters allowed
    if (medicationName.length < 2 || !/^[a-zA-Z\s]+$/.test(medicationName)) {
        alert(errorMessages[0]);
        return false;
    }

    // Dosage: must be a number (integer or decimal), at least 1 character
    if (dosage.trim() === "" || isNaN(dosage)) {
        alert(errorMessages[1]);
        return false;
    }

    // Time: must match HH:MM 24-hour format
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        alert(errorMessages[2]);
        return false;
    }

    // Date: must be valid date in YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(new Date(date).getTime())) {
        alert(errorMessages[3]);
        return false;
    }

    return true;
}

