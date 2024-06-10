// import { Mesh, MeshStandardMaterial, CylinderGeometry } from "three";
// import * as CANNON from "cannon";

// export class Peg extends Mesh {
//     constructor() {
//         const geometry = new CylinderGeometry(0.1, 0.1, 1.5, 32);
//         const material = new MeshStandardMaterial({ color: 0x000000 });

//         super(geometry, material);

//         this.rotateX(Math.PI / 2);

//         this.shape = new CANNON.Cylinder(0.1, 0.1, 1.5, 32);
//         this.body = new CANNON.Body({ 
//             mass: 100,
//             shape: this.shape,
//             position: new CANNON.Vec3(0, 0, 0),
//         });

//         this.body.addShape(this.shape);

//         this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);


//         this.userData.physicsBody = this.body;
//     }
// }


import { Mesh, MeshStandardMaterial, BoxGeometry } from "three";
import * as CANNON from "cannon";

export class Peg extends Mesh {
    constructor() {
        // Create the Three.js box geometry
        const geometry = new BoxGeometry(0.1, 0.1, 1.5);
        const material = new MeshStandardMaterial({ color: 0x000000 });

        super(geometry, material);

        // No need to rotate the geometry as it is already aligned
        // this.rotateX(Math.PI / 2);

        // Create the Cannon.js box shape
        const halfExtents = new CANNON.Vec3(0.1 / 2, 0.1 / 2, 1.5 / 2);
        this.shape = new CANNON.Box(halfExtents);
        this.body = new CANNON.Body({
            mass: 0,
            position: new CANNON.Vec3(0, 0, 0),
        });

        // Add the shape to the body
        this.body.addShape(this.shape);

        // No need to set quaternion for initial rotation as the box is aligned
        // this.body.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);

        // Ensure inertia is set correctly
        this.body.computeAABB();
        this.body.updateMassProperties();

        this.userData.physicsBody = this.body;
    }
}
