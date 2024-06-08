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
                    brick2.bounceOff(brick2);
                }
            }
        }
    }

    tick(delta) {
        this.handleCollisions();
    }
}