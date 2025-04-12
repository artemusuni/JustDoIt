import mongoose from "mongoose";
import crypto from "crypto"; // Built-in Node.js crypto module
const {Schema, model} = mongoose;

const companySchema = new Schema({
    companyName: String,
    companyRating: Number,

    email: String,
    user: String,
    password: String, // Will store hashed password instead of plaintext

    myEmployees: [String],
    questions: [String],
    answers: [[String]],
    correctAnswer: [Number]
});

// Pre-save middleware to hash password
companySchema.pre('save', function(next) {
    const company = this;
    
    // Only hash the password if it's modified or new
    if (!company.isModified('password')) return next();
    
    try {
        // Generate a random salt
        const salt = crypto.randomBytes(16).toString('hex');
        
        // Hash the password using PBKDF2 with salt
        const hash = crypto.pbkdf2Sync(
            company.password,
            salt,
            10000, // iterations
            64,    // key length
            'sha512'
        ).toString('hex');
        
        // Store both salt and hash
        company.password = `${salt}:${hash}`;
        next();
    } catch (err) {
        return next(err);
    }
});

// Method to compare passwords during authentication
companySchema.methods.comparePassword = function(candidatePassword) {
    try {
        const [salt, storedHash] = this.password.split(':');
        const hash = crypto.pbkdf2Sync(
            candidatePassword,
            salt,
            10000,
            64,
            'sha512'
        ).toString('hex');
        
        return storedHash === hash;
    } catch (err) {
        return false;
    }
};

const company = model ("Company", companySchema);
export default company;