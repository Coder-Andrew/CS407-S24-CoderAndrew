import { DirectionalLight } from "three";

export function createDirectionalLight() {
    const light = new DirectionalLight('white', 10);

    light.position.set(0, 0, 0);

    return light;
}