import mongoose from "mongoose";
import company from "/model/company";
import employee from "/model/employee";

mongoose.connect("mongodb+srv://kevinb71205:<db_password>@betterprepared.px7purl.mongodb.net/");

const employeeA = new employee ({
    company: "None", //On creation needs to be none need to set when added to a company

    employee: "Kevin Barry",
    employeeRating: 3.8,

    questions: [],
    answers: []
});

const myCompany = new company ({
    company: "BetterPrepared",
    companyRating: 5.0, //needs to be average of employee ratings need to figure this out

    employees: ["Kevin Barry", "Artem Pugach", "Niko"],
    questions: ["Question A", "Question B", "Question C"],
    answers: ["Asnwer A", "Answer B", "Answer C"]
});