import Employee from "./model/employee.js";

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import crypto from "crypto"; // Added for password hashing

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000; //default port will be 5000

app.use(cors());
app.use(bodyParser.json());

// Function to hash passwords
const hashPassword = (password) => {
  // Create a random salt
  const salt = crypto.randomBytes(16).toString('hex');
  // Create hash
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  // Return salt and hash
  return { salt, hash };
};

// Function to verify password
const verifyPassword = (password, salt, storedHash) => {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === storedHash;
};

//Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to The MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

//Test Route
app.get("/", (req, res) => {
    res.send("API is running");
});

//Finally start the server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

//Login Route
app.post("/api/auth/login", async (req, res) => {
    const { email, password} = req.body;
    try {
        // Find user by email
        const user = await Employee.findOne({ email });
        
        if (user) {
            // If user has salt and passwordHash, verify password using hash
            if (user.salt && user.passwordHash) {
                if (verifyPassword(password, user.salt, user.passwordHash)) {
                    res.status(200).json({ message: "Login successful", user });
                } else {
                    res.status(401).json({ message: "Invalid credentials"});
                }
            } else {
                // Keeping original logic
                res.status(200).json({ message: "Login successful", user });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials"});
        }


    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

});

//Registration Route
app.post("/api/auth/register", async (req, res) => {
    const { CompanyName, employeeName, email, password} = req.body;
    try {
       // Hash the password
       const { salt, hash } = hashPassword(password);
       
       const newEmployee = new Employee({
            companyName: CompanyName, // Fixed capitalization
            employeeName,
            email,
            // Store salt and hash instead of plaintext password
            salt,
            passwordHash: hash,
            employeeRating: 0,
            questions: [],
            answers: [],
        });
       await newEmployee.save();
       res.status(201).json({ message: ""});
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});