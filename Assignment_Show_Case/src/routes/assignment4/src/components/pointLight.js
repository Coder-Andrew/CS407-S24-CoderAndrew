import { PointLight } from 'three';

export function createPointLight() {
    const light = new PointLight('white', 1000);
    
    light.position.set(0, 0, 0);

    return light;
}