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
  }

  collidesWith(other) {
    const distance = this.position.distanceTo(other.position);
    return distance < 2;
  }

  // bounceOff(other) {
  //   const temp = this.kinematics.velocity.clone();
  //   this.kinematics.velocity = other.kinematics.velocity.clone();
  //   other.kinematics.velocity = temp;
  // }

  
  bounceOff(other) {
    // First calculate the normal vector between the two balls
    const normal = other.kinematics.position.clone().sub(this.kinematics.position).normalize();
    // Now calculate the relative velocity of the two balls
    const relativeVelocity = this.kinematics.velocity.clone().sub(other.kinematics.velocity);
    // and dot it with the normal to get the component of the relative velocity in the normal direction
    const velocityAlongNormal = relativeVelocity.dot(normal);
    // Update the velocities of the two balls
    this.kinematics.velocity.add(normal.clone().multiplyScalar(-velocityAlongNormal));
    other.kinematics.velocity.add(normal.clone().multiplyScalar(velocityAlongNormal));
    // let the next tick update the positions of the balls
}

  tick = (delta) => {
    this.kinematics.tick(this, delta);
  };
}