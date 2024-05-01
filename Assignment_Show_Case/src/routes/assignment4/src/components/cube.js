import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

function createCube() {
    const geometry = new BoxGeometry(1,1,1);

    const material = new MeshStandardMaterial({ color: 0x000000});

    const cube = new Mesh(geometry, material);

    return cube;
}

export { createCube };