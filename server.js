const express = require("express");
const { dirname } = require("path");
const app = express();
const Port = process.env.Port || 8000;
const http = require("http").createServer(app);
const path = require("path");

http.listen(Port, () => {
	console.log(`Listening to ${Port}`);
});

// console.log(path.join(__dirname, "./public"));
// const staticPath = path.join(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

const io = require("socket.io")(http);

io.on("connection", (socket) => {
	console.log("connected");
	socket.on("message", (msg) => {
		socket.broadcast.emit("message", msg);
	});
});
