const mongoose = require("mongoose");

const dbPath = process.env.MONGO_URI;

const connectDB = async () => {
  if (!dbPath) {
    const error = new Error("MONGO_URI is not defined");
    error.statusCode = 500;
    throw error;
  }

  try {
    await mongoose.connect(dbPath);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectDB;
