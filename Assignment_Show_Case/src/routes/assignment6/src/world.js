//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/lights.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { loadModels } from './components/loadModels.js';
import { createCameraControls } from './systems/cameraControls.js';
import { Loop } from './systems/Loop.js';
import { createHanger, createWalker } from './components/walker.js';
import { Vector3 } from 'three';

let camera;
let controls;
let renderer;
let scene;
let loop;

let walkerClass;
let walker;
let hangerClass;

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
        pointLight.position.set(0,100,0);

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
        //const { walker } = await loadModels();
        walkerClass = await createWalker();
        walker = walkerClass.model;

        

        //const { hanger } = await loadModels();
        hangerClass = await createHanger();
        const hanger = hangerClass.model;

        hanger.scale.set(5,5,5);

        //console.log(walkerClass);

        loop.updatables.push(walker, );

        scene.add(walker, hanger);
    }

    startWalker() {
        controls.target.copy(walker.position);
        walkerClass.playAnimation('Walk Cycle');

        const speed = 0.1;

        const angle = walker.rotation.z;
        walker.position.x -= speed * Math.cos(angle);
        walker.position.z += speed * Math.sin(angle);
    }
    stopWalker() {
        walkerClass.stopAnimation('Walk Cycle');
    }

    turnWalker(direction) {
        if (direction === -1) {
            walker.rotation.z += 0.1;
        
        } else if (direction === 1) {
            walker.rotation.z -= 0.1;
        }
    }
    

    render() {
        renderer.render(scene, camera);
    }


}

export { World };