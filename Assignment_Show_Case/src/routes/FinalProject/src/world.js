//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { Brick } from './components/brick.js';
import { Plane } from './components/plane.js';
import { AxesHelper } from 'three';
import { BrickWall } from './components/brickWall.js';
import { Collider } from './systems/collider.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createCameraControls } from './systems/cameraControls.js';
import { Loop } from './systems/Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;
let collider;


let pointLight;
let pointLight2;
let directionalLight;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        camera.position.set(0, 0, 10);

        controls = createCameraControls(camera, renderer);
        loop.updatables.push(controls);

        pointLight = createPointLight();
        pointLight.position.set(0,60,0);

        pointLight2 = createPointLight();
        pointLight2.position.set(0,60,20);

        const axesHelper = new AxesHelper(5);

        const brickWall = new BrickWall(10,10);
        
        collider = new Collider(brickWall.bricks);
        loop.updatables.push(collider);
        loop.updatables.push(...brickWall.bricks);

        scene.add(...brickWall.bricks);
        brickWall.bricks[0].add(axesHelper);

        const plane = new Plane(1000,1000);
        plane.rotation.x = Math.PI * -0.5;
        scene.add(plane);

        //loop.updatables.push(...brickWall.bricks);

        
        scene.add(pointLight, pointLight2);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    start() {
        loop.start();
    }
    
    stop() {
        loop.stop();
    }


    async init() {


        //scene.add();
    }

    render() {
        renderer.render(scene, camera);
    }


}

export { World };