const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/found";
    if (!process.env.MONGO_URI) {
      console.warn(
        "MONGO_URI not defined. Using default: 'mongodb://localhost:27017/found'"
      );
    }
    // Connect to MongoDB
    await mongoose.connect(dbURI);
    console.log("MongoDB connected to database:", dbURI);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
