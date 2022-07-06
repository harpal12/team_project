//const mediaController = require("../controllers/mediaController.js");
//const thumbnailGenerator = require('../helper/VideoThumbnail');
//const port = require('../config/default').port;
module.exports = (app) => {
  const express = require("express");
  const ImageModel = require("../Models/Media");
  const multer = require("multer");
  const fs = require("fs");
  const path = require("path");

  const ImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, path.join(__dirname, "./public"));
      } else {
        cb({ message: "This file is not an image file" }, false);
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === "video/mp4") {
        cb(null, path.join(__dirname, "../files"));
      } else {
        cb({ message: "This file is not in video format." }, false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });


  
  const upload = multer({
    storage: ImageStorage,
    storage: videoStorage
  });

  app.get("/", (req, res) => {
    res.send("upload file ");
  });
  //post create new media
  app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newData = new MediaModel({
          name: req.body.name,
          size: req.body.size,
          fileType: req.body.fileType,
        });
        newImage
          .save()
          .then(() => res.send("succesfuuly uploaded"))
          .catch((err) => console.log(err));
      }
      console.log(req);
    });
  });
};
