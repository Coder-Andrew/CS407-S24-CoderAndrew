import { PlaneGeometry, MeshStandardMaterial, Mesh} from 'three';

export function createPlane() {
    const geometry = new PlaneGeometry(500, 500);

    const material = new MeshStandardMaterial({ color: 0x00FF00 });

    const plane = new Mesh(geometry, material);

    plane.rotateX(-Math.PI / 2);

    return plane;
}
