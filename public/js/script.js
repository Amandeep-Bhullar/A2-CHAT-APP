const socket = io('https://a2-chat-app.herokuapp.com')
const messageContainer= document.getElementById('messageContainer')
const messageForm= document.getElementById('sendContainer')
const messageInput= document.getElementById('messageInput')
const alertInp= prompt('What is your name?');

const name = alertInp == null ? "Aman" : alertInp;
//
appendMessage('You joined')
socket.emit('new-user', name)

// msg sent from server is catched here
socket.on('chat-message', message=>{
    // Now msg is appended on container by calling appendMessage method
    const msg = message.message;
    const time = message.time;
    const username = message.name === name ? "You" : message.name;
    appendMessage(`${username}: ${msg}`, time)
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
        <div class="right-msg ">
            <div class="right-message-container">
                <span class="message">${message}</span>
                <span class="time">${time}</span>
            </div>
        </div>`
    }
    else{
        messageContainer.innerHTML += `
        <div class="left-msg"> 
            <div class="left-message-container">
                <span>${message}</span>
                <span class="time">${time}</span>
            </div>
        </div>`
    }
}