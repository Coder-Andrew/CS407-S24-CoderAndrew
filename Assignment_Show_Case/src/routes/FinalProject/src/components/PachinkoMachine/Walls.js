import {Mesh, MeshStandardMaterial, BoxGeometry} from 'three';
import * as CANNON from 'cannon';

export class SideWall extends Mesh {
    constructor() {
        const geometry = new BoxGeometry(0.5, 20, 2.5);
        const material = new MeshStandardMaterial({ color: 0x000000 });
        
        super(geometry, material);

        const halfExtents = new CANNON.Vec3(0.5 / 2, 20 / 2, 2.5 / 2);
        this.shape = new CANNON.Box(halfExtents);
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
        });
        this.body.addShape(this.shape);

        this.userData.physicsBody = this.body;
    }
}

export class SlatWall extends Mesh {
    constructor(length = 0.15, width = 5, depth = 2.5) {
        const geometry = new BoxGeometry(length, width, depth);
        const material = new MeshStandardMaterial({ color: 0x000000 });

        super(geometry, material);

        const halfExtents = new CANNON.Vec3(length / 2, width / 2, depth / 2);
        this.shape = new CANNON.Box(halfExtents);
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
        });
        this.body.addShape(this.shape);
        
        this.userData.physicsBody = this.body;
    
    }
}
