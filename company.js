import mongoose from "mongoose";
const {Schema, model} = mongoose;

const companySchema = new Schema({
    company: String,
    companyRating: Double,

    questions: [String],
    answers: [String]
});

const company = model ("Company", companySchema);