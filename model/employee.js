import mongoose from "mongoose";
const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    company: String,

    employee: String,
    employeeRating: Number,

    questions: [String],
    answers: [String]
});

const employee = model ("Empoyee", employeeSchema);
export default employee;