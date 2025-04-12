import mongoose from "mongoose";
const {Schema, model} = mongoose;

const companySchema = new Schema({
    company: String,
    companyRating: Number,

    empolyees: [String],
    questions: [String],
    answers: [String]
});

const company = model ("Company", companySchema);
export default company;