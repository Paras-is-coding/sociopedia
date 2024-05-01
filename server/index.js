const http = require('http');
require('dotenv').config();
const app = require('./src/config/express.config.js');

// import socket
const socket = require('socket.io');


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
  




// create io after creating server
const io = socket(server,{
    cors:{
        origin:"*",
        credentials:true     
    }
});

// we'll store all our online users inside this Map 
let onlineUsers = new Map();


io.on("connection",(socket)=>{
    // console.log("User connected: ",socket.id);

    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
        // console.log("User addded:",userId);
    });

    socket.on("send-msg",(data)=>{
        // console.log(data)
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.message);
        }
    })

    socket.on("send-notification", (data) => {
        console.log("ou at indback",onlineUsers);
        const recipientSocket = onlineUsers.get(data.recipientId);
        if (recipientSocket) {
            io.to(recipientSocket).emit("new-notification", data.notification);
        }
    });

    socket.on("notification-received", (notificationId) => {
        console.log("Notification recieved : ",notificationId)
        // Logic for handling notification acknowledgment
    });

});




module.exports = {io,onlineUsers};