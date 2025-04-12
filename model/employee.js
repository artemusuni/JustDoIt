import mongoose from "mongoose";
const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    companyName: String,

    employeeName: String,
    employeeRating: Number,

    email: String,
    user: String,
    password: String,

    questions: [String],
    answers: [[String]],
    correctAnswers: [Number]
});

const employee = model ("Employee", employeeSchema);
export default employee;