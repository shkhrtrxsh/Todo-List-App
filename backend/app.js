require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Add CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Allow', 'OPTIONS, GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.use("/", userRoutes);

module.exports = app;
