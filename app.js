//import express and assigned to variable
const express = require('express')
//import socket.io,which will run on port 3000 and assigned to variable
const io = require('socket.io')(3000);
//Create Express APP Object()
const app = express();

const users={}

io.on('connection', socket => {
    socket.on('new-user', name=>{
        users[socket.id]=name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', message =>{
        socket.broadcast.emit('chat-message',{message: message, name: 
        users[socket.id]} )
        console.log(message)
    })
    socket.on('disconneted', () =>{
        socket.broadcast.emit('user-disconneted', users[socket.id])
        delete users[socket.id]
    })
})
//app object will get request and will give response 
app.get("/", (req, res) => {
    res.send("Server is up");
    console.log("server is up");
})


//Create our web server
//Port number
app.listen(3001, () =>{
    console.log("server is running");
});

