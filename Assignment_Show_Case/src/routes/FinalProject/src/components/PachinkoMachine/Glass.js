import { Mesh, MeshBasicMaterial, BoxGeometry } from 'three';
import * as CANNON from 'cannon';

export class FrontGlass extends Mesh {
    constructor() {
        const geometry = new BoxGeometry(15, 20, 0.5);
        const material = new MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.25,
        });
        
        super(geometry, material);


    }
}

export class BackGlass extends Mesh {
    constructor() {
        const geometry = new BoxGeometry(15, 20, 0.5);
        const material = new MeshBasicMaterial({ 
            color: 0x000000,
        });
        
        super(geometry, material);

    }
}