const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");
const amqp = require("amqplib");
const mongoose = require("mongoose");
require("dotenv").config();

// Set up MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a schema for video documents
const videoSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  // Add other fields as needed
});

const Video = mongoose.model("Video", videoSchema);

const app = express();
const port = process.env.PORT || 3000;

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Define WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// RabbitMQ connection
async function setupRabbitMQ() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "audio_chunks";

  await channel.assertQueue(queue, { durable: false });

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      // Send audio chunks to RabbitMQ
      channel.sendToQueue(queue, Buffer.from(message));
    });
  });
}

// Define an endpoint to receive the video file
app.post("/upload", upload.single("video"), async (req, res) => {
  try {
    // Handle the uploaded video file here and save it to disk
    // For example, you can perform any additional processing or validation here

    // Create a new video document and save it to MongoDB
    const newVideo = new Video({
      filename: req.file.originalname,
      filePath: req.file.path, // Store the file path on disk
      // Add other fields as needed
    });

    await newVideo.save();

    res.status(200).json({ message: "Video uploaded and saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload and save the video" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is listening at home");
});

// Start the server and setup RabbitMQ
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  setupRabbitMQ();
});
