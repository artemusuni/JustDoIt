import mongoose from "mongoose";
const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    company: String,

    employeeName: String,
    employeeRating: Number,

    questions: [String],
    answers: [String]
});

const employee = model ("Employee", employeeSchema);
export default employee;