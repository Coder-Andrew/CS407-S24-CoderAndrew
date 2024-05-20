import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";


export async function loadModels() {
    const loader = new GLTFLoader();
    
    try {
        const [walkerData] = await Promise.all([
            loader.loadAsync('/assets/models/lowpoly_walker_tank.glb'),
        ]);

        //console.log(walkerData);

        const walker = setupModel(walkerData);
    
        return { walker }


    } catch (error) {
        console.error('Error loading model:', error);
    }
}
