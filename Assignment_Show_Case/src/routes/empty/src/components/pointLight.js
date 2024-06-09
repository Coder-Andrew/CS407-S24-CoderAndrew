import { PointLight } from 'three';

export function createPointLight() {
    const light = new PointLight('white', 50000);
    
    light.position.set(0, 0, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 2048;  // Increase shadow map size for better quality
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;

    return light;
}