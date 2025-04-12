import mongoose from "mongoose";
import Company from "./model/company.js";
import Employee from "./model/employee.js";

mongoose.connect("mongodb+srv://kevinb71205:ur85xvDzeixc1CWs@betterprepared.px7purl.mongodb.net/BetterPreparedData?retryWrites=true&w=majority&appName=BetterPrepared");

const employeeA = new Employee ({
    companyName: "No name", //On creation needs to be none need to set when added to a company

    employeeName: "Kevin Barry",
    employeeRating: 3.8,

    questions: ["a"],
    answers: [["b"]],
    correctAnswer: [1]
});

const myCompany = new Company ({
    companyName: "BetterPrepared",
    companyRating: 5.0, //needs to be average of employee ratings need to figure this out

    myEmployees: ["Kevin Barry", "Artem Pugach", "Niko"],
    questions: ["Question A", "Question B", "Question C"],
    answers: [["Asnwer A", "Answer B", "Answer C"],["Asnwer A", "Answer B", "Answer C"], ["Asnwer A", "Answer B", "Answer C"]],
    correctAnswer: [2, 1, 3]
});

await employeeA.save();
await myCompany.save();

const testCompany = await Company.findOne({});
console.log(testCompany);
