import mongoose from "mongoose";
import crypto from "crypto"; // Built-in Node.js module
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

// Pre-save hook to hash passwords
companySchema.pre('save', function(next) {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) return next();
    
    // Generate a salt
    const salt = crypto.randomBytes(16).toString('hex');
    // Hash the password
    const hash = crypto.pbkdf2Sync(this.password, salt, 10000, 64, 'sha512').toString('hex');
    // Set the hashed password
    this.password = `${salt}:${hash}`;
    next();
});

// Add a method to verify passwords
companySchema.methods.verifyPassword = function(candidatePassword) {
    if (!this.password || !this.password.includes(':')) return false;
    
    const [salt, hash] = this.password.split(':');
    const calculatedHash = crypto.pbkdf2Sync(candidatePassword, salt, 10000, 64, 'sha512').toString('hex');
    return hash === calculatedHash;
};

const company = model ("Company", companySchema);
export default company;