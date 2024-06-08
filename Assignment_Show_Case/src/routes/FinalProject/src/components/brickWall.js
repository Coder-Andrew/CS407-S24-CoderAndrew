import { Brick } from "./brick";

export class BrickWall {
    constructor(rows = 10, cols = 10) {
        this.bricks = []; 

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const brick = new Brick();
                brick.position.set(j * 2, (i * 1) + 1, 0);
                this.bricks.push(brick);
            }
        }
    }
}