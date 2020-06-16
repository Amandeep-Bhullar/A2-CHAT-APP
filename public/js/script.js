const socket = io('http://localhost:3000')
const messageContainer= document.getElementById('messageContainer')
const messageForm= document.getElementById('sendContainer')
const messageInput= document.getElementById('messageInput')
const alertInp= prompt('What is your name?');

const name = alertInp == null ? "Aman" : alertInp;
//
appendMessage('You joined')
socket.emit('new-user', name)

// msg sent from server is catched here
socket.on('chat-message', data=>{
    // Now msg is appended on container by calling appendMessage method
    const innerObj = JSON.parse(data.message);
    const msg = innerObj.message;
    const time = innerObj.time;
    appendMessage(`${data.name}: ${msg}`, time)
})

socket.on('user-connected',name =>{
    if(name)
        appendMessage(`${name} connected`)
}) 

socket.on('user-disconnected',name =>{
    appendMessage(`${name} disconnected`)
})


messageForm.addEventListener('submit',ele =>{
    // stop the Page from reload
    ele.preventDefault()
    const message= messageInput.value;
    const messageTime = new Date().toLocaleTimeString();
    appendMessage(`You: ${message}`, messageTime)
    // send the msg to server
    socket.emit('send-chat-message', JSON.stringify({message:message, time: messageTime}))
    // clear the input msg
    messageInput.value=''
})

function appendMessage(message, time = null){
    console.log(message);
    if(time == null){
        messageContainer.innerHTML += `
        <div class="center-msg">
            <span>${message}</span>
        </div>`
    }
    else if(message.startsWith("You:")){
        messageContainer.innerHTML += `
        <div class="right-msg">
            <span class="message">${message}</span>
            <span class="time">${time}</span>
        </div>`
    }
    else{
        messageContainer.innerHTML += `
        <div class="left-msg"> 
            <span>${message}</span>
            <span class="time">${time}</span>
        </div>`
    }
}