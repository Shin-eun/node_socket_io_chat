"use strict"
const socket = io();

const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");


chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13){
        send();
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    // 프론트에서 보내기
    socket.emit("chatting", param);
}

sendButton?.addEventListener("click", () => {
    send();
})

//서버에서 보낸 값 받기
socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = `
            <span class="profile">
                <span class="user">${this.name}</span>
                    <img src="https://placeimg.com/50/50/any" alt="" />
                </span>
                <span class="message">${this.msg}</span>
            <span class="time">${this.time}</span>
        `;
        li.innerHTML=dom;
        chatList.appendChild(li);
    }
}

//ngrok 사용해서 외부 테스트진행하기
//npm i -g ngrok
//ngrok http 5000