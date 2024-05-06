import { CylinderGeometry, Mesh, MeshStandardMaterial } from "three";

export function createCylinder(materialParams = { color: 0xff00ff }) {
    const geometry = new CylinderGeometry(5, 5, 50, 32);

    const material = new MeshStandardMaterial(materialParams);

    const cylinder = new Mesh(geometry, material);

    cylinder.position.set(0, 0, 0);

    return cylinder;
}