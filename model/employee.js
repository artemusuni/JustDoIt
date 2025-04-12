import mongoose from "mongoose";
import crypto from "crypto"; // Node.js built-in module
const {Schema, model} = mongoose;

// Constants for PBKDF2
const ITERATIONS = 10000; // Number of iterations (adjust as needed)
const KEY_LENGTH = 64; // Length of the derived key in bytes
const DIGEST = 'sha512'; // Digest algorithm

const employeeSchema = new Schema({
    companyName: String,

    employeeName: String,
    employeeRating: Number,

    email: String,
    user: String,
    password: String,
    salt: String, // Added field to store salt for secure password hashing

    questions: [String],
    answers: [[String]],
    correctAnswers: [Number]
});

// Hash password before saving
employeeSchema.pre('save', function(next) {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) return next();
    
    // Generate a salt if one doesn't exist
    if (!this.salt) {
        this.salt = crypto.randomBytes(16).toString('hex');
    }
    
    // Create a secure hash using PBKDF2
    this.password = crypto.pbkdf2Sync(
        this.password, 
        this.salt, 
        ITERATIONS, 
        KEY_LENGTH, 
        DIGEST
    ).toString('hex');
    
    next();
});

// Method to verify password
employeeSchema.methods.verifyPassword = function(candidatePassword) {
    // Handle legacy passwords (SHA-256 without salt)
    if (!this.salt) {
        // Check if the password matches using the old SHA-256 method
        const oldHash = crypto.createHash('sha256').update(candidatePassword).digest('hex');
        return this.password === oldHash;
    }
    
    // For passwords with salt, use PBKDF2
    const hash = crypto.pbkdf2Sync(
        candidatePassword,
        this.salt,
        ITERATIONS,
        KEY_LENGTH,
        DIGEST
    ).toString('hex');
    
    return this.password === hash;
};

// Method to check if password needs upgrading to secure format
employeeSchema.methods.needsPasswordUpgrade = function() {
    return !this.salt; // If there's no salt, it's using the old hashing method
};

const employee = model ("Employee", employeeSchema);
export default employee;