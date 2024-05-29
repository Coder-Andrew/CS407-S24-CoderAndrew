//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { createCube, createBlackHoleCube } from './components/spheres.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { loadModels } from './components/loadModels.js';
import { createCameraControls } from './systems/cameraControls.js';
import { Loop } from './systems/Loop.js';

let xSlider, ySlider, zSlider;

let camera;
let controls;
let renderer;
let scene;
let loop;

let cube;
let blackHoleCube;

let pointLight;
let directionalLight;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);

        controls = createCameraControls(camera, renderer);
        loop.updatables.push(controls);

        pointLight = createPointLight();
        pointLight.position.set(0,60,0);

        camera.position.set(0, 0, 10);

        cube = createCube();
        cube.position.set(0, 0, -4);

        blackHoleCube = createBlackHoleCube();
        // blackHoleCube.position.set(0, 0, 4);
        loop.updatables.push(blackHoleCube);

        
        scene.add(pointLight, cube, blackHoleCube);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    start() {
        loop.start();
    }
    
    stop() {
        loop.stop();
    }

    updateCoordinates(vec) {
        // blackHoleCube.position.set(vec.x, vec.y, vec.z);
        blackHoleCube.material.uniforms.xValue.value = vec.x;
        blackHoleCube.material.uniforms.yValue.value = vec.y;
        blackHoleCube.material.uniforms.zValue.value = vec.z;


        this.render();
    }

    async init() {


        //scene.add();
    }

    render() {
        renderer.render(scene, camera);
    }


}

export { World };