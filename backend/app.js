require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cors = require("cors");

// Add CORS middleware


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectToDB();
app.use("/", userRoutes);

module.exports = app;
