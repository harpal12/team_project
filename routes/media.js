const express = require("express");
const multer = require('multer');
const fs = require("fs");
const path = require("path");

const mediaController = require("../controllers/mediaController.js");
//const thumbnailGenerator = require('../helper/VideoThumbnail');
//const port = require('../config/default').port;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "public/video");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    var ext = path.extname(file.originalname);

    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("only videos are allowed"));
    }
    cb(null, true);
  },
});

const router = express.Router();

//get all media
router.get("/all", mediaController.create);

//post create new media
router.post(
  '/create',
  upload.fields([
    {
      name: "videos",
      maxCount: 5,
    },
  ]),
  mediaController.create
);

module.exports = router;
