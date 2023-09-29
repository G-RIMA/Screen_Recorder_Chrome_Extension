const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

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

// Define an endpoint to receive the video file
app.post("/upload", upload.single("video"), (req, res) => {
  // Handle the uploaded video file here
  // For this example, we'll just send a success message
  res.status(200).json({ message: "Video uploaded successfully" });
});

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

// Define an endpoint to render a page for video playback
app.get("/play/:videoFileName", (req, res) => {
  const videoFileName = req.params.videoFileName;
  const videoPath = path.join(__dirname, "uploads", videoFileName);

  // Check if the video file exists
  if (fs.existsSync(videoPath)) {
    const videoPageTemplate = fs.readFileSync(
      path.join(__dirname, "public", "video.html"),
      "utf8"
    );

    const videoPage = videoPageTemplate.replace(
      "{{videoSource}}",
      `/uploads/${videoFileName}`
    );

    // Render the video playback page with the video file
    res.send(videoPage);
  } else {
    res.status(404).send("Video not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
