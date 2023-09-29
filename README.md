# Screen Recorder Backend

This is the backend component of the Screen Recorder Chrome Extentions project. It receives video uploads, saves them to disk, provides a web page for video play.

### Table of Contents

- Features
- Prerequisites
- Getting Started
  - Installation
  - Usage
- API Endpoints

* File Structure
* Contributing
* License

### Features

- Accepts video uploads from the Screen Recorder Chrome Extension.
- Saves uploaded videos to the local file system.
- Provides a dynamic web page for video playback.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- Chrome Extension frontend configured to send video uploads to this backend.

## Getting Started

### Installation

1. clone repository

```
git clone https://github.com/yourusername/screen-recorder-backend.git

```

2. Navigate to the project directory:

```
cd Screen_Recorder_Chrome_extention

```

3. Install dependancies

```
npm install

```

### Usage

1. start Server

```
node app.js

```

the server will run on `http://localhost:3000` by default

2. Test the server by accessing the "Hello, World" endpoint

```
http://localhost:3000/hello

```

3. Set up the Screen Recorder Chrome Extension to use this backend as the endpoint for video uploads. Update the extension's configuration to point to http://localhost:3000/upload

4. Upload a video using the Chrome Extension.

5. Access the video playback page:

```
http://localhost:3000/play/your-video-filename.mp4

```

Replace "your-video-filename.mp4" with the actual filename of the uploaded video.

### API Endpoints

- POST /upload: Accepts video file uploads.
- GET /play/:videoFileName: Renders a web page for video playback.

### File Structure

server.js: The main Node.js server file.
uploads/: Directory where uploaded videos are stored.
public/: Contains static files (e.g., HTML templates, CSS) for rendering the video playback page.

### Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and test them thoroughly.
Create a pull request, describing your changes and why they are needed.
