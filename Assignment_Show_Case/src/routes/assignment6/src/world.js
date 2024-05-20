//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { loadModels } from './components/loadModels.js';
import { createCameraControls } from './systems/cameraControls.js';
import { Loop } from './systems/Loop.js';


let camera;
let controls;
let renderer;
let scene;
let loop;
let walker;

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

        camera.position.set(0, 0, 20);

        
        scene.add(pointLight);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    start() {
        loop.start();
    }
    
    stop() {
        loop.stop();
    }

    async init() {
        const { walker } = await loadModels();
        
        loop.updatables.push(walker);

        scene.add(walker);
    }

    render() {
        renderer.render(scene, camera);
    }


}

export { World };