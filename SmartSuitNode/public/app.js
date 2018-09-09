window.onload = () => {

	// let socket = io.connect('https://absolutfrenemy.pink:3000');
	// let socket = io.connect('http://absolutfrenemy.pink:3000');
	// let socket = io.connect('http://172.20.10.4:3000');

	// const wss = new WebSocket("ws://35.205.180.57:3000");
	const wss = new WebSocket("ws://127.0.0.1:3000");

	var sceneEl = document.querySelector('a-scene');

	const c = 5;

	let joints = [
		'RokokoGuy_Hips',

		'RokokoGuy_LeftUpLeg',
		'RokokoGuy_RightUpLeg',
		'RokokoGuy_Spine',

		'RokokoGuy_LeftLeg',
		'RokokoGuy_LeftFoot',
		'RokokoGuy_LeftHeel',
		'RokokoGuy_LeftToe',

		'RokokoGuy_RightLeg',
		'RokokoGuy_RightFoot',
		'RokokoGuy_RightHeel',
		'RokokoGuy_RightToe',

		'RokokoGuy_Spine',
		'RokokoGuy_Neck',
		'RokokoGuy_Head',

		'RokokoGuy_LeftShoulder',
		'RokokoGuy_LeftArm',
		'RokokoGuy_LeftForeArm',
		'RokokoGuy_LeftHand',

		'RokokoGuy_RightShoulder',
		'RokokoGuy_RightArm',
		'RokokoGuy_RightForeArm',
		'RokokoGuy_RightHand',
		];

	let objects = [];

	for (let joint of joints){
		var newEl = document.createElement('a-sphere');
		newEl.setAttribute('color', 'white');
		newEl.setAttribute('width', '0.5');
		newEl.setAttribute('height', '0.5');
		newEl.setAttribute('depth', '0.5');
		var newLight = document.createElement('a-light');
		newEl.appendChild(newLight);
		sceneEl.appendChild(newEl);
		objects.push(newEl);
	}

	wss.onmessage = (data) => {

		data = JSON.parse(data.data);

		for (let i = 0; i < joints.length; i++){
			if (joints[i] === data.name){

				objects[i].object3D.setAttribute('start',`${data.px} ${data.py} ${data.pz}`);
				objects[i].object3D.setAttribute('end',`${data.px*10} ${data.py*10} ${data.pz*10}`);
			}
		}
	}
}

AFRAME.registerComponent('bone-replace', {
	schema: {
	},
	init() {
		const data = this.data;
		this.el.addEventListener('model-loaded', e => {
			const object = e.detail.model;
			object.traverse(node => {
				console.log(node);
			});
		});
	}
});