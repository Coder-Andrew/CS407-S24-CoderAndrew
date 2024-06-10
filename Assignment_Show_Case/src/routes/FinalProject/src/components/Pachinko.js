import { Object3D } from "three";
import { FrontGlass, BackGlass } from "./PachinkoMachine/Glass";
import { SideWall, SlatWall } from "./PachinkoMachine/Walls";
import { Peg } from "./PachinkoMachine/Peg";

export class Pachinko extends Object3D{
    constructor(audioListener, audioLoader) {
        super();
        this.physicalObjects = [];


        this.frontGlass = new FrontGlass();
        this.add(this.frontGlass);
        this.frontGlass.position.set(0, 10, 0);
        

        this.backGlass = new BackGlass();
        this.add(this.backGlass);
        this.backGlass.position.set(0, 10, -2);

        this.sidewall = new SideWall();
        this.add(this.sidewall);
        this.sidewall.position.set(7.25, 15, -1.01);
        this.sidewall.body.position.set(this.sidewall.position.x, this.sidewall.position.y, this.sidewall.position.z);

        this.sidewall2 = new SideWall();
        this.add(this.sidewall2);
        this.sidewall2.position.set(-7.25, 15, -1.01);
        this.sidewall2.body.position.set(this.sidewall2.position.x, this.sidewall2.position.y, this.sidewall2.position.z);
        this.physicalObjects.push(this.sidewall, this.sidewall2);

        for(let i = 0; i < 7; i++) {
            const slatWall = new SlatWall();
            this.add(slatWall);
            slatWall.position.set(-5.25 + i * 1.75, 5, -1.01);
            slatWall.body.position.set(slatWall.position.x, slatWall.position.y, slatWall.position.z);
            this.physicalObjects.push(slatWall);
        }

        // Make the pegs, 7 in a row, 1.75 units apart, multiple rows, starting at 5 units up, staggered
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                const peg = new Peg(audioListener, audioLoader);
                this.add(peg);
                peg.position.set(-5.75 + i * 1.75 + (j % 2) * 0.875, 10 + j * 1.75, -1.01);
                peg.body.position.set(peg.position.x, peg.position.y, peg.position.z);
                this.physicalObjects.push(peg);
            }
        }

    }

}