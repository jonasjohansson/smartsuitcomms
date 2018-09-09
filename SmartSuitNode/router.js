const WebSocket = require('ws');
 
var osc = require('node-osc');

var client = new osc.Client('192.168.2.46', 9111);
var client2 = new osc.Client('192.168.2.228', 9112);

// const uri = 'ws://35.205.180.57:3000';
const uri = 'ws://127.0.0.1:3000';

const wws = new WebSocket(uri);

let msg;

var letters = ['A','B','C','D','E','F','G','H','I','J','K'];

wws.on('message', function incoming(data) {
	// console.log('received: %s', data);
	data = JSON.parse(data);

	switch (data.name) {
		// case 'RokokoGuy_Hips':
		// 	msg = new osc.Message('/hips');
		// 	msg.append(data.px);
		// 	client2.send(msg);
		// break;
		case 'RokokoGuy_Head':
			msg = new osc.Message('movX');
			msg.append(64);
			client.send(msg);

			msg = new osc.Message('movY');
			msg.append(30);
			client.send(msg);
			
			msg = new osc.Message('movZ');
			msg.append(64);
			client.send(msg);
			// client2.send(msg);
		break;
		case 'RokokoGuy_LeftArm':
			msg = new osc.Message('/leftArm');
			msg.append(data.rx);
			client2.send(msg);
		break;
		case 'RokokoGuy_RightArm':
			msg = new osc.Message('/rightArm');
			msg.append(data.rx);
			client2.send(msg);
		break;
		case 'RokokoGuy_LeftHand':

			for (let i = 0; i < letters.length; i++){
				msg = new osc.Message('/leftHand'+letters[i]);
				msg.append(0);
				client2.send(msg);
			}

			var val = data.ry;

			if (val > 0.9 && val < 1.0){
				msg = new osc.Message('/leftHandA');
			} else if (val > 0.8 && val < 0.9) {
				msg = new osc.Message('/leftHandB');
			} else if (val > 0.7 && val < 0.8) {
				msg = new osc.Message('/leftHandC');
			} else if (val > 0.6 && val < 0.7) {
				msg = new osc.Message('/leftHandD');
			} else if (val > 0.5 && val < 0.6) {
				msg = new osc.Message('/leftHandE');
			} else if (val > 0.6 && val < 0.7) {
				msg = new osc.Message('/leftHandF');
			} else if (val > 0.5 && val < 0.6) {
				msg = new osc.Message('/leftHandG');
			} else if (val > 0.4 && val < 0.5) {
				msg = new osc.Message('/leftHandH');
			} else if (val > 0.3 && val < 0.4) {
				msg = new osc.Message('/leftHandI');
			} else if (val > 0.2 && val < 0.3) {
				msg = new osc.Message('/leftHandJ');
			} else if (val > 0.1 && val < 0.2) {
				msg = new osc.Message('/leftHandK');
			}

			msg.append(val);
			client2.send(msg);
		break;
		case 'RokokoGuy_RightHand':

			for (let i = 0; i < letters.length; i++){
				msg = new osc.Message('/rightHand'+letters[i]);
				msg.append(0);
				client2.send(msg);
			}

			var val = data.ry;

			if (val > 0.9 && val < 1.0){
				msg = new osc.Message('/rightHandA');
			} else if (val > 0.8 && val < 0.9) {
				msg = new osc.Message('/rightHandB');
			} else if (val > 0.7 && val < 0.8) {
				msg = new osc.Message('/rightHandC');
			} else if (val > 0.6 && val < 0.7) {
				msg = new osc.Message('/rightHandD');
			} else if (val > 0.5 && val < 0.6) {
				msg = new osc.Message('/rightHandE');
			} else if (val > 0.6 && val < 0.7) {
				msg = new osc.Message('/rightHandF');
			} else if (val > 0.5 && val < 0.6) {
				msg = new osc.Message('/rightHandG');
			} else if (val > 0.4 && val < 0.5) {
				msg = new osc.Message('/rightHandH');
			} else if (val > 0.3 && val < 0.4) {
				msg = new osc.Message('/rightHandI');
			} else if (val > 0.2 && val < 0.3) {
				msg = new osc.Message('/rightHandJ');
			} else if (val > 0.1 && val < 0.2) {
				msg = new osc.Message('/rightHandK');
			}

			console.log(val);

			msg.append(val);
			client2.send(msg);
		break;
		case 'RokokoGuy_LeftLeg':
			msg = new osc.Message('/leftLeg');
			msg.append(data.rx);
			client2.send(msg);
		break;
		case 'RokokoGuy_RightLeg':
			msg = new osc.Message('/rightLeg');
			msg.append(data.rx);
			client2.send(msg);
		break;
	}
});

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
	return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// let val = (data.pz*data.pz)*128;
// var msg =  new osc.Message('/rotY');
// msg.append(val);
// client.send(msg);

// let val2 = 0.5-data.ry;
// val2 = val2.map(0.25,0.8,0,1);
// // if (val2 < 0)
// // 	val2 *= -1;
// var msg2 =  new osc.Message('/rotY');
// msg2.append(val2);
// client2.send(msg2);

// console.log(val2);