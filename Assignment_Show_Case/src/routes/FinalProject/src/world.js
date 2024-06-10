import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { Plane } from './components/plane.js';
import { AxesHelper, AudioListener, AudioLoader, Audio } from 'three';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createCameraControls } from './systems/cameraControls.js';
import { Loop } from './systems/Loop.js';
import { Pachinko } from './components/Pachinko.js';
import { createPhysicsSphere, createSphere } from './components/sphere.js';
import { Peg } from './components/PachinkoMachine/Peg.js';
import * as CANNON from 'cannon';

let camera;
let controls;
let renderer;
let scene;
let loop;
let collider;
let pointLight;
let pointLight2;
let physicsWorld;
let animationFrame;
let numberOfRemainingBalls = 5;
let balls = [];

let sound;
let listener;
let audioLoader;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        camera.position.set(0,20,50);

        physicsWorld = new CANNON.World();
        physicsWorld.gravity.set(0, -9.82, 0);

        controls = createCameraControls(camera, renderer);
        loop.updatables.push(controls);

        pointLight = createPointLight();
        pointLight.position.set(0,60,0);

        pointLight2 = createPointLight();
        pointLight2.position.set(0,60,20);

        const axesHelper = new AxesHelper(5);

        const plane = new Plane(1000,1000);
        scene.add(plane);
        physicsWorld.addBody(plane.body);
        
        scene.add(pointLight, pointLight2);
        
        // Add audio
        listener = new AudioListener();
        camera.add(listener);
        audioLoader = new AudioLoader();

        // Add pachinko machine
        const pachinko = new Pachinko(listener, audioLoader);
        pachinko.position.set(0, 5, 0);
        scene.add(pachinko);
        
        // Add pachinko machine to physics world
        pachinko.physicalObjects.forEach(obj =>  {
            scene.add(obj);
            physicsWorld.addBody(obj.body);
        });
        

        
        
            
        const resizer = new Resizer(container, camera, renderer);
        camera.lookAt(-100,0,0);
    }
            
    start() {
        loop.start();
        this.animate();
    }
    
    stop() {
        cancelAnimationFrame(animationFrame);
        //loop.stop();
    }

    async init() {}

    render() {
        renderer.render(scene, camera);
    }
    
    spawnSphere() {
        //if (numberOfRemainingBalls <= 0) return;
        
        const sphere = createPhysicsSphere();
        scene.add(sphere.mesh);
        physicsWorld.addBody(sphere.body);
        balls.push(sphere);
        
        //numberOfRemainingBalls--;
    }
        
    getNumberOfRemainingBalls() { return numberOfRemainingBalls; }
        
    clearBalls() {
        balls.forEach(ball => {
            scene.remove(ball.mesh);
            physicsWorld.remove(ball.body);
        });
        balls = [];
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = 1 / 60;

        physicsWorld.step(delta);

        // Update Three.js meshes with Cannon.js bodies
        scene.children.forEach(child => {
            if (child.userData.physicsBody) {
                child.position.copy(child.userData.physicsBody.position);
                child.quaternion.copy(child.userData.physicsBody.quaternion);
            }
        });

        renderer.render(scene, camera);
    }
}

export { World };
