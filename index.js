import mongoose from "mongoose";
import Company from "./model/company.js";
import Employee from "./model/employee.js";

// Use environment variable for MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Check if the environment variable is set
if (!mongoURI) {
  console.error('MongoDB connection string not found. Please set the MONGO_URI environment variable.');
  process.exit(1); // Exit with error
}

mongoose.connect(mongoURI);

const employeeA = new Employee ({
    companyName: "No name", //On creation needs to be none need to set when added to a company

    employeeName: "Kevin Barry",
    employeeRating: 3.8, //Needs to be made into the average of quiz answers right

    questions: ["a"],
    answers: [["b"]],
    correctAnswer: [1]
});

const myCompany = new Company ({
    companyName: "BetterPrepared",
    companyRating: 5.0, //needs to be average of employee ratings need to figure this out

    myEmployees: ["Kevin Barry", "Artem Pugach", "Niko"],
    questions: ["Question A", "Question B", "Question C"], //need to set default questions
    answers: [["Asnwer A", "Answer B", "Answer C"],["Asnwer A", "Answer B", "Answer C"], ["Asnwer A", "Answer B", "Answer C"]], 
    correctAnswer: [2, 1, 3]
});

var aperson = Employee.findOne(Employee.employeeName== employeeA.employeeName);
if (aperson != null){
    await Employee.deleteOne(aperson)
    await employeeA.save();
}
else {
    await employeeA.save();
}
var acompany = Company.findOne(Company.companyName == myCompany.companyName);
if (acompany != null){
    await Company.deleteOne(acompany)
    await myCompany.save()
}
else {
    await myCompany.save()
}

const testCompany = await Company.findOne({});
console.log(testCompany);