import mongoose from "mongoose";
const {Schema, model} = mongoose;

const companySchema = new Schema({
    companyName: String,
    companyRating: Number,

    email: String,
    user: String,
    password: String,

    myEmployees: [String],
    questions: [String],
    answers: [[String]],
    correctAnswer: [Number]
});

const company = model ("Company", companySchema);
export default company;