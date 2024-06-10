import { Mesh, PlaneGeometry, MeshStandardMaterial } from "three";
import * as CANNON from 'cannon';

export class Plane extends Mesh {
    constructor(length = 100, width = 100, color = 0x808080) {
        
        const geometry = new PlaneGeometry(width, length, 100, 100);
        const material = new MeshStandardMaterial({ color });
        
        super(geometry, material);
        
        this.rotateX(-Math.PI / 2);
        this.receiveShadow = true;
        
        this.shape = new CANNON.Plane();
        this.body = new CANNON.Body({ mass: 0 });

        this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

        this.body.addShape(this.shape);
    }
}