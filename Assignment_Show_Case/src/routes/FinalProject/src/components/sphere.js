import { CylinderGeometry, SphereGeometry, Mesh, MeshStandardMaterial } from "three";
import * as CANNON from "cannon";

export function createCylinder(materialParams = { color: 0xff00ff }) {
    const geometry = new CylinderGeometry(5, 5, 50, 32);

    const material = new MeshStandardMaterial(materialParams);

    const cylinder = new Mesh(geometry, material);

    cylinder.position.set(0, 0, 0);

    return cylinder;
}

export function createSphere() {
    const geometry = new SphereGeometry(0.5, 32, 32);
    const material = new MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    return sphere;
}

export function createPhysicsSphere() {
    const radius = 0.5;
    const geometry = new SphereGeometry(radius, 32, 32);
    const material = new MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(0, 30, -1);

    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({ mass: 1 });

    body.addShape(shape);
    body.position.set(sphere.position.x, sphere.position.y, sphere.position.z);

    sphere.userData.physicsBody = body;

    return { mesh: sphere, body };
}

