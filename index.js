import mongoose from "mongoose";
import Company from "./model/company.js";
import Employee from "./model/employee.js";

// Connection options:
// 1. Set MONGODB_URI environment variable with complete connection string
// 2. Set individual environment variables: MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE
let mongoURI = process.env.MONGODB_URI;

// If MONGODB_URI is not set, try to build it from individual components
if (!mongoURI) {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const host = process.env.MONGODB_HOST;
  const database = process.env.MONGODB_DATABASE;
  const appName = process.env.MONGODB_APPNAME || 'BetterPrepared';
  
  if (!user || !password || !host || !database) {
    console.error("MongoDB connection information missing.");
    console.error("Either set MONGODB_URI environment variable with the complete connection string:");
    console.error("  export MONGODB_URI=\"mongodb+srv://user:password@host/database?options\"");
    console.error("Or set all of these environment variables:");
    console.error("  export MONGODB_USER=\"user\"");
    console.error("  export MONGODB_PASSWORD=\"password\"");
    console.error("  export MONGODB_HOST=\"host\"");
    console.error("  export MONGODB_DATABASE=\"database\"");
    console.error("  export MONGODB_APPNAME=\"appname\" (optional)");
    process.exit(1);
  }
  
  mongoURI = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=${appName}`;
}

mongoose.connect(mongoURI);

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