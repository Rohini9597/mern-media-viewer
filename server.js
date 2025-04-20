
const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb+srv://rohirece:WIapVLS7OWkNyjR9@cluster0.z3exnsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to DB Successfully");
}) 
.catch((err) => {
    console.log(err);
})

const videoSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    fileType : {
        type:String,
        require:true,
        enum:["mp4","MP4","mov", "MOV"]
    },
    size : {
        type:Number,
        require:true
    },
    duration : {
        type:Number,
        require:true
    },
    data : {
        type:Buffer,
        require:true
    },
});

const Video = mongoose.model("Video", videoSchema);

//Upload Video
app.post("/upload-video", async(req, res) => {
    try {
        const existingVideo = await Video.findOne({ name: "ProjectVideo" });
        if (existingVideo) {
            return res.status(400).send("Video already exists in DB.");
        }

        const videoPath = path.join(__dirname, "public/gallery/ProjectVideo.mp4");
        const videoBuffer = fs.readFileSync(videoPath);

        const newVideo = new Video({
            name: "ProjectVideo",
            fileType: "MP4",
            size: videoBuffer.length,
            duration: 22,
            data: videoBuffer,
        })
        await newVideo.save();
        res.send("Video Saved in MongoDB successfully.");
    } catch (err) {
        res.status(500).send({Message: "Internal server error"});
    }
});


app.get("/stream-video", async (req,res) => {
    const video = await Video.findOne({name:"ProjectVideo" });
    
    if (!video) return res.status(404).send("Video not found");

    res.setHeader("Content-Type", "video/mp4");
    res.send(video.data);
});


const port = 9080;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})