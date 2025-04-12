import mongoose from "mongoose";
import crypto from "crypto"; // Node.js built-in module
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

// Hash password before saving
employeeSchema.pre('save', function(next) {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) return next();
    
    // Create a hash of the password using SHA-256
    // In a production environment, use a more secure method with salting
    const hash = crypto.createHash('sha256').update(this.password).digest('hex');
    this.password = hash;
    next();
});

// Method to verify password
employeeSchema.methods.verifyPassword = function(candidatePassword) {
    const hash = crypto.createHash('sha256').update(candidatePassword).digest('hex');
    return this.password === hash;
};

const employee = model ("Employee", employeeSchema);
export default employee;