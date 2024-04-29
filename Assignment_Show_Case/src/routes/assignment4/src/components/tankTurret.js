import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

export function createTurret() {
    const geometry = new BoxGeometry(10, 1, 1);

    geometry.translate(5,0,0);

    const material = new MeshStandardMaterial({ color: 0xBDBDBD, metalness: 1, roughness: 100});

    const cube = new Mesh(geometry, material);

    return cube;
}
