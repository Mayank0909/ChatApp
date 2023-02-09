const socket = io();
let Name;

let textarea = document.querySelector("#textarea");

let button = document.getElementById("button");

let messageArea = document.querySelector(".message_area");
do {
	Name = prompt("Please Enter Your Name : ");
} while (!Name);

textarea.addEventListener("keyup", (e) => {
	console.log(e);
	if (e.key === "Enter") {
		sendMessage(e.target.value);
	}
});

function sendMessage(message) {
	let msg = {
		user: Name,
		message: message.trim(),
		time: new Date().toLocaleString(),
	};
	appendMessage(msg, "outgoing");
	textarea.value = "";
	socket.emit("message", msg);
	scroll();
}

function appendMessage(msg, type) {
	let mainDiv = document.createElement("div");
	let className = type;
	mainDiv.classList.add(className, "message");
	let markup = `
    <h4>${msg.user}</h4>
    <p class="time">${msg.time}</p>

    <p>${msg.message}</p>
    `;
	mainDiv.innerHTML = markup;
	messageArea.appendChild(mainDiv);
}

socket.on("message", (msg) => {
	appendMessage(msg, "incoming");
	scroll();
});

function scroll() {
	messageArea.scrollTop = messageArea.scrollHeight;
}
