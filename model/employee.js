import mongoose from "mongoose";
import crypto from "crypto";
const {Schema, model} = mongoose;

const employeeSchema = new Schema({
    companyName: String,

    employeeName: String,
    employeeRating: Number,

    email: String,
    user: String,
    password: {
        type: String,
        // Don't return password in queries by default
        select: false
    },
    salt: {
        type: String,
        select: false
    },

    questions: [String],
    answers: [[String]],
    correctAnswers: [Number]
});

// Hash password before saving
employeeSchema.pre("save", function(next) {
    // Only hash the password if it's modified or new and not empty
    if (!this.isModified("password") || !this.password) return next();
    
    // Generate a random salt
    this.salt = crypto.randomBytes(16).toString("hex");
    
    // Hash the password with the salt
    this.password = crypto
        .pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512")
        .toString("hex");
    
    next();
});

// Method to compare entered password with stored hash
employeeSchema.methods.comparePassword = function(candidatePassword) {
    if (!this.salt || !this.password) return false;
    
    const hash = crypto
        .pbkdf2Sync(candidatePassword, this.salt, 1000, 64, "sha512")
        .toString("hex");
    return this.password === hash;
};

const employee = model ("Employee", employeeSchema);
export default employee;