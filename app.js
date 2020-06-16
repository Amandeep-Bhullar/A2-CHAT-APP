//import express and assigned to variable
const express = require('express')
//import socket.io,which will run on port 3000 and assigned to variable
const io = require('socket.io')(3000);
//Create Express APP Object()
const app = express();

const users={}
/*
    user {
        id1: "Aman"
    }
*/
// acts as a listner when connected
io.on('connection', socket => {
    // socket.on receives the message from client
    socket.on('new-user', name =>{
        // Store the user name  with socketID as key
        users[socket.id]=name
        // send to every client
        socket.broadcast.emit('user-connected', name)
    })
    // catch a chat message
    socket.on('send-chat-message', msg =>{
        const obj = JSON.parse(msg);
        const message = obj.message;
        const time = obj.time;
        console.log(obj);
        socket.broadcast.emit('chat-message',
            {   message: message, name: users[socket.id], time: time} 
        )
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

