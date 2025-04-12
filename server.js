import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000; //default port will be 5000

app.use(cors());
app.use(bodyParser.json());

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