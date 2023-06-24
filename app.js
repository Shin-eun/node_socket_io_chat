const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io")
const moment = require("moment");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;

//받는 부분
io.on("connection", (socket) => {
    socket.on("chatting", (data) => {
        console.log(data);
        const {name, msg} = data;

        io.emit("chatting", {
            name,
            msg,
            time : moment(new Date()).format("hh:mm A")
        })
    })
})

server.listen(PORT, ()=> console.log(`server is running ${PORT}`));