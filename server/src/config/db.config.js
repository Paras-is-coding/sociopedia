const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.MONGODB_NAME,
  autoCreate:true,
  autoIndex:true
}).then((success)=>{
    console.log("MongoDB connected successfully!");
}).catch((ex)=>{
    console.log("Error connecting to database!")
})
