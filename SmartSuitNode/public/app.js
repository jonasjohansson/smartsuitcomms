window.onload = () => {

	// let socket = io.connect('https://absolutfrenemy.pink:3000');
	// let socket = io.connect('http://absolutfrenemy.pink:3000');
	// let socket = io.connect('http://172.20.10.4:3000');
	let socket = io();

	var sceneEl = document.querySelector('a-scene');
	const c = 10;

	let joints = [
		'RokokoGuy_Head',
		'RokokoGuy_LeftShoulder',
		'RokokoGuy_LeftArm',
		'RokokoGuy_RightShoulder',
		'RokokoGuy_RightArm',
		];

	let objects = [];

	for (let joint of joints){
		var newEl = document.createElement('a-box');
		newEl.setAttribute('color', 'red');
		newEl.setAttribute('width', '0.5');
		newEl.setAttribute('height', '0.5');
		newEl.setAttribute('depth', '0.5');
		sceneEl.appendChild(newEl);
		objects.push(newEl);
	}

	socket.on('data', data => {

		for (let i = 0; i < joints.length; i++){
			if (joints[i] === data.name){
				objects[i].object3D.position.set(data.px*c,data.py*c,data.pz*c);
			}
		}
	});
}