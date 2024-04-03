import * as THREE from './node_modules/three/build/three.module.js';     // if this gives you an error it's because you forgot to install three.js :-)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 0.5, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube2 = new THREE.Mesh( geometry, material2 );
cube2.position.x = 2;
scene.add( cube2 );

let cubes = [];
for (let i = 0; i < 5; i++) {
	const material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	const cube3 = new THREE.Mesh( geometry, material2 );
	
	cubes.push( cube3 );

	cube3.position.y = -2;
	cube3.position.x = -1+i;
	scene.add( cube3 );
}


camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	cube2.rotation.x += 0.01;
	cube2.rotation.y += 0.01;

	cubes.forEach((cube) => {
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
	});

	renderer.render( scene, camera );
}


animate();