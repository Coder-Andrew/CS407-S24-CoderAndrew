//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createKnottedTorus } from './components/knottedTorus.js';
import { createCylinder } from './components/cylinder.js';
import { createDirectionalLight } from './components/directionalLight.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let camera;
let renderer;
let scene;

let pointLight;
let directionalLight;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        const cylinder = createCylinder();
        const knottedTorus = createKnottedTorus();
        directionalLight = createDirectionalLight();
        pointLight = createPointLight();

        cylinder.position.set(-20,0,0);
        knottedTorus.position.set(10,0,0);
        directionalLight.position.set(0, 0, 100);
        pointLight.position.set(0,60,0);
        camera.position.set(0, 0, 100);

        
        scene.add(cylinder, knottedTorus, directionalLight, pointLight);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }

    togglePointLight() {
        pointLight.visible = !pointLight.visible;
        this.render();
    }

    toggleDirectionalLight() {
        directionalLight.visible = !directionalLight.visible;
        this.render();        
    }

}

export { World };