import { TorusKnotGeometry, Mesh, MeshStandardMaterial } from "three";

export function createKnottedTorus() {
    const geometry = new TorusKnotGeometry(5, 3, 100, 16);

    const material = new MeshStandardMaterial({ color: 0x00FF00, metalness: 1, roughness: 0.25 });

    const torus = new Mesh(geometry, material);

    torus.position.set(0, 0, 0);

    return torus;
}