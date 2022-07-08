
//const mediaController = require("../controllers/mediaController.js");
//const thumbnailGenerator = require('../helper/VideoThumbnail');
//const port = require('../config/default').port;
// module.exports =(app) =>{
//   const express = require("express");
//   const ImageModel = require("../Models/Media");
//   const multer = require('multer');
//   const fs = require("fs");
//   const path = require("path");

  


// const ImageStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//         cb(null, path.join(__dirname, "./public"));
//       } else {
//         cb({ message: "This file is not an image file" }, false);
//       }
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });

// const videoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === "video/mp4") {
//       cb(null, path.join(__dirname, "../files"));
//     } else {
//       cb({ message: "This file is not in video format." }, false);
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// })
  
  


// const upload = multer({
//   storage: ImageStorage,
  
//   fileFilter: (req, file, cb) => {
//     var ext = path.extname(file.mimetype);
  
//     if (ext !== "jpeg" && ext !== "jpg") {
//       return cb(null,"image");
//     }
   
//     cb(null,true)
  

//   },

// }).array("image",12);



// const addImage = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     var ext = path.extname(file.originalname);

//     if (ext !== ".jpeg" && ext !== ".jpg") {
//       return cb(new Error("only image are allowed"));
//     }
//     cb(null, "public/image");

//   },
// });


// const addDocs = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     var ext = path.extname(file.originalname);

//     if (ext !== ".doc" ) {
//       return cb(new Error("only document are allowed"));
//     }
//     cb(null, "public/document");

//   },
// });

//const router = express.Router();

//get all media
//router.get("/all", mediaController.create);
// app.get("/",(req,res) =>{
//   res.send("upload file ");
// });
// //post create new media
// app.post("/upload",(req,res) => {
  
//   upload(req,res,(err)=>{
//     if (err){
//       console.log(err);
//     }else {
//       const newImage =new ImageModel({
//         name:req.body.name,
//         size:req.body.size,
//         fileType:req.body.fileType,
//       });
//       newImage.save()
//       .then(()=> res.send("succesfuuly uploaded"))
//       .catch((err)=>console.log(err));
//     }
//     console.log(req);
//   })
  
// })
// };
module.exports = (app) => {
  const multer = require("multer");
  const MediaModel = require("../Models/Media");
  const router = require("express").Router();

  const Storage = multer.diskStorage({
    destination: "uploads",

    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    storage: Storage,
  }).array("image",12);

  app.get("/", (req, res) => {
    res.send("upload file");
  });

  app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newImage = new MediaModel({
          name: req.body.name,
          size: req.body.size,
          fileType: req.body.filetype,
        //   image: {
        //     data: req.file.filename,
        //     contentType: "image/jpeg",
        //   },
        });

        newImage
          .save()
          .then(() => res.send("succesfully uploaded"))
          .catch((err) => console.log(err));
      }
    });
  });
};
