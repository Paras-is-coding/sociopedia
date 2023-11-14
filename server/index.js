const http = require('http');
require('dotenv').config();
const app = require('./src/config/express.config.js');


const server = http.createServer(app);


server.listen(process.env.PORT,process.env.HOST,(err)=>{
    if(!err){
        console.log(`Server is running in port ${process.env.PORT} !`);
        console.log("Press Ctrl+C to disconnect server!");
        console.log(`Click http://${process.env.HOST}:${process.env.PORT} to browse your server!`);
    }
    else{
        console.log("Error connecting to the server!");
    }
})