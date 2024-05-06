//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { createCustomObj } from './components/logo.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createCylinder } from './components/cylinder.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let camera;
let renderer;
let scene;

let customObj;

let pointLight;
let controls;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        
        customObj = createCustomObj();
        scene.add(customObj);
        
        const cylinder = createCylinder();
        cylinder.position.set(7, 0, 0);
        scene.add(cylinder);
        
        pointLight = createPointLight();
        pointLight.position.set(0,100,0);
        
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = true;
        controls.enableZoom = true;
        
        camera.position.set(0, 0, 10);  
        controls.update();

        scene.add(pointLight);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Update the controls
        controls.update();
        
        // Render the scene
        renderer.render(scene, camera);
    }



}

export { World };