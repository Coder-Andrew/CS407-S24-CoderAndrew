import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function createCameraControls(camera, renderer) {
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -2.5;

    controls.tick = () => controls.update();

    return controls;
}