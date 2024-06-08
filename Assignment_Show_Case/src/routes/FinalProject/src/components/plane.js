import { Mesh, PlaneGeometry, MeshStandardMaterial } from "three";

export class Plane extends Mesh {
    constructor(length = 100, width = 100, color = 0x808080) {
        const geometry = new PlaneGeometry(width, length, 100, 100);
        const material = new MeshStandardMaterial({ color });
        
        super(geometry, material);
    }
}