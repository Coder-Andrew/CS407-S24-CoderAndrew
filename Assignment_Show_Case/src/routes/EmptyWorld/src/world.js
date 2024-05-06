//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
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



        pointLight = createPointLight();
        pointLight.position.set(0,60,0);

        camera.position.set(0, 0, 100);

        
        scene.add(pointLight);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }


}

export { World };