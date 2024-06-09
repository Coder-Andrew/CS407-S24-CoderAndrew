import { Vector3 } from "three";

export class Collider {
    constructor(bricks) {
        this.bricks = bricks;
    }

    handleCollisions() {
        for (let i = 0; i < this.bricks.length; i++) {
            for (let j = i + 1; j < this.bricks.length; j++) {
                const brick1 = this.bricks[i];
                const brick2 = this.bricks[j];
                if (brick1.collidesWith(brick2)) {
                    this.resolveCollision(brick1, brick2);
                }
            }
        }
    }

    resolveCollision(brick1, brick2) {
        // Calculate the overlap
        const overlap = brick1.geometry.boundingBox.intersect(brick2.geometry.boundingBox);

        if (overlap) {
            // Separate the bricks by moving them apart along the collision normal
            const normal = overlap.getCenter(new Vector3()).sub(brick1.position).normalize();
            const displacement = overlap.getSize(new Vector3()).length() / 2;

            brick1.position.add(normal.clone().multiplyScalar(displacement));
            brick2.position.add(normal.clone().multiplyScalar(-displacement));

            // Adjust velocities to simulate bounce
            this.adjustVelocities(brick1, brick2, normal);
        }
    }

    adjustVelocities(brick1, brick2, normal) {
        const relativeVelocity = brick1.kinematics.velocity.clone().sub(brick2.kinematics.velocity);
        const velocityAlongNormal = relativeVelocity.dot(normal);

        if (velocityAlongNormal > 0) return;

        const restitution = Math.min(brick1.restitution, brick2.restitution);
        const impulseMagnitude = -(1 + restitution) * velocityAlongNormal;

        const impulse = normal.multiplyScalar(impulseMagnitude);

        brick1.kinematics.velocity.add(impulse);
        brick2.kinematics.velocity.sub(impulse);
    }

    tick(delta) {
        this.handleCollisions();
    }
}
