const mongoose = require('mongoose');

const MediaSchema = mongoose.Schema({

    medias: [
        {
          fileType: {
            type: String,
            enum: ["Video", "Image", "Doc"],
            required: true,
          },
    
          name: {
            type: String,
            required: true,
          },
          size: { type: Number, required: true },
    
          isDeleted: {
            type: Boolean,
            default: false,
          },
        },
      ],


    // name:{
    //     type:String,
    //     required:true
    // },
    // size:{
    //     type:String,
    //     required:true
    // },
    // filetype:{
    //     type:String,
    //     required:true
    // },
    // image:{
    //     data:Buffer,
    //     cintentType:String
    // }
})

module.exports = MediaModel = mongoose.model('MediaModel',MediaSchema)