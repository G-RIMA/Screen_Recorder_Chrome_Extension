require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.DATABASE_URL;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema and model for video documents
const videoSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  // Add other fields as needed
});

const Video = mongoose.model("Video", videoSchema);
