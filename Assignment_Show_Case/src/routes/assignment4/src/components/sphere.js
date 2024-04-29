import { SphereGeometry, Mesh, MeshStandardMaterial } from "three";

export function createSphere(radius, widthSegments, heightSegments) {

    const geometry = new SphereGeometry(radius, widthSegments, heightSegments);

    const material = new MeshStandardMaterial({ color: 0x0000FF });

    const sphere = new Mesh(geometry, material);

    return sphere;
}