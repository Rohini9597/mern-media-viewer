# Video Streaming App (MongoDB + Express)

This project is a simple video streaming application built using:

- **Node.js**
- **Express.js**
- **MongoDB (Binary Buffer storage, not GridFS)**
- **HTML + JS frontend**

## 🚀 Features

- Upload videos (< 20MB) and store directly in MongoDB
- Stream video to browser with native HTML `<video>` tag
- Play/Pause controls via simple UI
- MongoDB used as buffer store (no filesystem, no GridFS)

## 📁 Folder Structure
    /public
    /gallery
    ProjectVideo.mp4 <-- Your sample video
    index.html <-- Frontend interface
    script.js <-- Play/Pause control
    server.js <-- Express backend