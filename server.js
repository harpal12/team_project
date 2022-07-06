const express =require('express');
const mongoose = require("mongoose");
const dotenv=require('dotenv');
const bodyParser= require("body-parser")
dotenv.config();
const cors = require('cors');
const app  = express();


//const path = require("path");
//const mediaRoutes = require("./routes/media");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

//app.use("api/v1/media",mediaRoutes);


//const mongodbUri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.0';


mongoose.connect('mongodb://127.0.0.1:27017/uploadproject');

// mongoose.connect(mongodbUri,{
//     userNewUrlParser:true,
// });

mongoose.connection.on('error',err=>{
    console.log('connection failed');
});
 mongoose.connection.on('connected',connected=>{
    console.log('connected with mongodb');
 });

 require('./routes/media')(app);

 const PORT=process.env.PORT;
app.listen(PORT, () =>{
    console.log(`app is runnig on ....${PORT}`)
});


