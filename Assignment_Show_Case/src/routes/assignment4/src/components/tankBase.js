import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

export function createTankBase() {
    const geometry = new BoxGeometry(5, 2, 10);

    const material = new MeshStandardMaterial({ color: 0x000000});

    const cube = new Mesh(geometry, material);

    return cube;
}
