//import { createCube } from './components/cube.js';
import { createCamera } from './components/camera.js';
import { createKnottedTorus } from './components/knottedTorus.js';
import { createCylinder } from './components/cylinder.js';
import { createDirectionalLight } from './components/directionalLight.js';
import { createPointLight } from './components/pointLight.js';
import { createScene } from './components/scene.js';
import { createTankBase } from './components/tankBase.js';
import { createTurretBase } from './components/tankTurretBase.js';
import { createTurret } from './components/tankTurret.js';
import { createPlane } from './components/plane.js';
import { createSphere } from './components/sphere.js';

import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let camera;
let renderer;
let scene;

let pointLight;
let directionalLight;

let tankBase;
let tankTurret;
let tankTurretBase;

let sphere;
let sphere2;
let sphere3;

class World {
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        pointLight = createPointLight();
        pointLight.position.set(0,10,10);
        camera.position.set(0, 10, 50);
        camera.lookAt(0, 0, 0);

        tankBase = createTankBase();
        tankTurretBase = createTurretBase();
        tankTurretBase.position.set(0, 1.5, 0);
        tankTurret = createTurret();
        tankTurret.position.set(0, 0, 0);
        tankTurretBase.rotation.y = -Math.PI/2;

        sphere = createSphere(5, 10, 10);
        sphere.position.set(0, 10, -30);
        sphere2 = createSphere(2, 10, 10);
        sphere2.position.set(-15, 0, 0);
        sphere3 = createSphere(1, 10, 10);
        sphere3.position.set(-5, 0, 0);

        const plane = createPlane();
        plane.position.set(0,-1, 0);
        
        // scene.add(cylinder, knottedTorus, directionalLight, pointLight);
        scene.add(pointLight, plane);

        sphere.add(sphere2);
        sphere2.add(sphere3);
        scene.add(sphere);

        tankBase.add(tankTurretBase);
        tankTurretBase.add(tankTurret);
        scene.add(tankBase);
        
        const resizer = new Resizer(container, camera, renderer);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        sphere.rotation.y += 0.01;
        sphere2.rotation.y += 0.05;

        renderer.render(scene, camera);
    }

    followTank() {
        tankTurret.add(camera);        
    }
    followOrbit() {
        sphere.add(camera);
    }
    resetCamera() {
        scene.add(camera);
        camera.position.set(0, 10, 50);
        //camera.lookAt(tankBase);
        renderer.render(scene, camera);
    }


    slewTurret(direction) {
        tankTurretBase.rotation.y += direction;
        renderer.render(scene, camera);
    }
    elevateTurret(direction) {
        if (this.toDegrees(tankTurret.rotation.z + direction) <= -7 || this.toDegrees(tankTurret.rotation.z + direction) > 60){
            return;
        }
        tankTurret.rotation.z += direction;
        renderer.render(scene, camera);
    }
    rotateTank(direction) {
        console.log(`x: ${tankBase.rotation.x}, z: ${tankBase.rotation.z}, y: ${tankBase.rotation.y}`);
        tankBase.rotation.y += direction;
    }

    moveTankX(mag) {
        tankBase.position.x += mag;
    }

    moveTank(direction) {
        console.log(`x: ${tankBase.rotation.x}, z: ${tankBase.rotation.z}, y: ${tankBase.rotation.y}`);
        console.log(`xp: ${tankBase.position.x}, zp: ${tankBase.position.z}, yp: ${tankBase.position.y}`);
        tankBase.position.z += direction * Math.cos(tankBase.rotation.y);
        tankBase.position.x += direction * Math.sin(tankBase.rotation.y);
        camera.lookAt(tankBase.position);
    }
    
    toDegrees(angle) {
        return angle * (180 / Math.PI);
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