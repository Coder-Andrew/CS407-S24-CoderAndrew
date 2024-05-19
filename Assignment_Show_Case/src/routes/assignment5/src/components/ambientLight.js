import { DirectionalLight } from 'three';

export function createAmbientLight() {
    const light = new DirectionalLight('blue', 10000);
    
    light.position.set(0, 0, 0);

    return light;
}