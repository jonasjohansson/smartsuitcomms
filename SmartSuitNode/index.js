var PORT = 7002;
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var mainSocket = null;
var oldMessage = "";

socket.on('listening', function () {
    var address = socket.address();
    console.log('UDP Client listening on ' + address.address + ":" + address.port);
    socket.setBroadcast(true);
});

socket.on('message', function (message, info) {
	let msg = message.toString();
	let obj = JSON.parse(msg);
	if (oldMessage !== message){
		oldMessage = message;
	}
	if (mainSocket !== null)
		mainSocket.emit('data',obj);
    // console.log('Message from: ' + rinfo.address + ':' + rinfo.port +' - ' + message);
});

socket.bind(PORT);

// 

const express = require('express');
const app = express();
const path = require('path');

const server = require('http').createServer(app);

const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, '/public')));

let users = [];

io.on('connection', socket => {
	mainSocket = socket;
});