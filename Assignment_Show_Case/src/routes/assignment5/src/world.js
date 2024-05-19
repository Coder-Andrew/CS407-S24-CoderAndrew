//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { createCustomObj } from './components/logo.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { createCylinder } from './components/cylinder.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AxesHelper } from 'three';
import { createCameraControls } from './systems/cameraControls.js';
import { createAmbientLight } from './components/ambientLight.js';

let camera;
let renderer;
let scene;

let customObj;

let pointLight;
let ambientLight;

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
        cylinder.position.set(0, 0, 50);
        scene.add(cylinder);
        
        pointLight = createPointLight();
        pointLight.position.set(0,10,50);

        ambientLight = createAmbientLight();
        ambientLight.position.set(0, -20, 0);
        
        const axesHelper = new AxesHelper(5);
        scene.add(axesHelper);

        controls = createCameraControls(camera, renderer);
        
        camera.position.set(0, 0, 10);  
        controls.update();

        controls.target.set(0, 0, 0);

        scene.add(pointLight, ambientLight);
        
        
        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Update the controls
        //controls.
        customObj.rotation.y += 0.01;

        controls.update();
        
        // Render the scene
        renderer.render(scene, camera);
    }

    toggleAmbientLight() {
        ambientLight.visible = !ambientLight.visible;
    }
    isAmbientLightVisible() {
        return ambientLight.visible;
    }

    togglePointLight() {
        pointLight.visible = !pointLight.visible;
    }
    isPointLightVisible() {
        console.log(pointLight.visible);
        return pointLight.visible;
    }



}

export { World };