import { Mesh, BoxGeometry, MeshStandardMaterial } from "three";
import { Kinematics } from "./Kinematics";

export class Brick extends Mesh {
    constructor(length = 2, width = 1, height = 1, color = 0xa52a2a) {    
        const geometry = new BoxGeometry(length, width, height);
        const material = new MeshStandardMaterial({ color });
        
        super(geometry, material);
        
        this.kinematics = new Kinematics(0.5);
        this.geometry = geometry;
        this.material = material;
        this.geometry.computeBoundingBox(); // Compute bounding box for collision detection
    }

    collidesWith(other) {
        // this.geometry.computeBoundingBox();
        // other.geometry.computeBoundingBox();

        // const thisBox = this.geometry.boundingBox.clone().translate(this.position);
        // const otherBox = other.geometry.boundingBox.clone().translate(other.position);

        // return thisBox.intersectsBox(otherBox);
        return false;
    }

    bounceOff(other) {
        const normal = other.kinematics.position.clone().sub(this.kinematics.position).normalize();
        const relativeVelocity = this.kinematics.velocity.clone().sub(other.kinematics.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);

        if (velocityAlongNormal > 0) return;

        const restitution = 0.7; // Coefficient of restitution
        const impulseMagnitude = -(1 + restitution) * velocityAlongNormal;

        const impulse = normal.multiplyScalar(impulseMagnitude);

        this.kinematics.velocity.add(impulse);
        other.kinematics.velocity.sub(impulse);
    }

    tick(delta) {
      //console.log(this.position);
      this.kinematics.tick(this, delta);
    }
}
