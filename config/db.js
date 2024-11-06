const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) {
      console.error("MONGO_URI not defined in environment variables.");
      return;
    }

    // Connect to MongoDB Atlas without deprecated options
    await mongoose.connect(dbURI);
    console.log("MongoDB Atlas connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
