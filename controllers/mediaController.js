const Media = require("../Models/Media");

const getAll = async (req, res) => {
  try {
    constmedia = await Media.find();

    res.json(Media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


//Backendurl/public/video/files_name.mp4
const create = async (req, res) => {
  
  const { name } = req.body;
  let videosPath = [];

  if (Array.isArray(req.files.videos) && req.files.videos.lenght >0) {
    for (let video of req.files.videos) {
      videosPath.push("/" + video.path);
    }
  }
  try {
    const createdMedia = await Media.create({
      name,
      videos: videosPaths,
    })
    res.json({ message: "media created succesfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.ststus(400).json(error);
  }
};
 
module.exports = {getAll,create};