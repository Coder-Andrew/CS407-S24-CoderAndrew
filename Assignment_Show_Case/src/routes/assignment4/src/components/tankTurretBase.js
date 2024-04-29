import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

export function createTurretBase() {
    const geometry = new BoxGeometry(5, 1, 5);

    const material = new MeshStandardMaterial({ color: 0x616161});

    const cube = new Mesh(geometry, material);

    return cube;
}
