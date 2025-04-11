import mongoose from "mongoose";

const employeeSchema = new Schema({
    company: String,

    employee: String,
    employeeRating: Double,

    questions: [String],
    answers: [String]
});

const employee = model ("Empoyee", employeeSchema);