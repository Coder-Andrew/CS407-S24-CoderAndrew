import * as THREE from 'three';
import * as CANNON from 'cannon';
import { createCameraControls } from './systems/cameraControls';
import { Resizer } from '../../empty/src/systems/Resizer';
import { createPointLight } from './components/pointLight';

let delta = 1 / 6000;
let pointLight;
let pointLight2;


class World {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);
        
        // create controls
        this.controls = createCameraControls(this.camera, this.renderer);
        this.scene.add(this.camera);

        pointLight = createPointLight();
        pointLight.position.set(0, 100, 10);
        this.scene.add(pointLight);

        // Cannon.js physics world
        this.physicsWorld = new CANNON.World();
        this.physicsWorld.gravity.set(0, -9.82, 0);

        this.createGround();
        this.createBricks();

        this.camera.position.set(40, 5, -10);
        //this.controls.target.set(20, 5, 10);
        this.controls.update();

        this.shootBall();

        this.animate();

        const resizer = new Resizer(container, this.camera, this.renderer);
    }

    changeBallMass(newMass) {
        this.ballBody.mass = newMass;
        this.ballBody.updateMassProperties();
    }

    createGround() {
        const groundShape = new CANNON.Plane();
        const groundBody = new CANNON.Body({ mass: 0 });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // Correctly orient the ground plane
        this.physicsWorld.addBody(groundBody);

        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
        groundMesh.receiveShadow = true;
        
        groundMesh.rotation.x = -Math.PI / 2;
        this.scene.add(groundMesh);
    }

    createBricks() {
        const brickGeometry = new THREE.BoxGeometry(2, 1, 1);
        const brickMaterial = new THREE.MeshStandardMaterial({ color: 0x964B00 });
    
        for (let j = 0; j < 10; j++) { // 10 rows
            for (let i = 0; i < 10; i++) { // 10 bricks per row
                const brickMesh = new THREE.Mesh(brickGeometry, brickMaterial);
                brickMesh.castShadow = true;
                // Stagger bricks in alternate rows for stability
                const xOffset = (j % 2 === 0) ? 0 : 1;
                brickMesh.position.set(i * 2.01 - xOffset, 0.5 + j * 1.01, 0);
                this.scene.add(brickMesh);
    
                const brickShape = new CANNON.Box(new CANNON.Vec3(1, 0.5, 0.5));
                const brickBody = new CANNON.Body({ mass: 1 });
                brickBody.addShape(brickShape);
                brickBody.position.set(brickMesh.position.x, brickMesh.position.y, brickMesh.position.z);
                this.physicsWorld.addBody(brickBody);
    
                brickMesh.userData.physicsBody = brickBody;
            }
        }
    }
    
    shootBall() {
        const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
        ballMesh.position.set(10, 5, 10);

        const ballShape = new CANNON.Sphere(0.5);
        this.ballBody = new CANNON.Body({ mass: 25 });
        this.ballBody.addShape(ballShape);

        this.ballBody.position.set(ballMesh.position.x, ballMesh.position.y, ballMesh.position.z);
        this.ballBody.velocity.set(0, 0, -20);
        this.physicsWorld.addBody(this.ballBody);

        ballMesh.userData.physicsBody = this.ballBody;

        this.controls.target.copy(ballMesh.position);
        this.controls.update();

        this.scene.add(ballMesh);
    }

    changeDelta(newDelta) {
        delta = newDelta;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        //const delta = 1 / 60;

        this.physicsWorld.step(delta);

        // Update Three.js meshes with Cannon.js bodies
        this.scene.children.forEach(child => {
            if (child.userData.physicsBody) {
                child.position.copy(child.userData.physicsBody.position);
                child.quaternion.copy(child.userData.physicsBody.quaternion);
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
}

export { World };
