import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";


export async function loadModels() {
    const loader = new GLTFLoader();
    
    try {
        const [parrotData, flamingoData, ] = await Promise.all([
            loader.loadAsync('/assets/models/Parrot.glb'),
            loader.loadAsync('/assets/models/Flamingo.glb'),
        ]);

        console.log(parrotData);

        const parrot = setupModel(parrotData);
        const flamingo = setupModel(flamingoData);

        return { parrot, flamingo}


    } catch (error) {
        console.error('Error loading model:', error);
    }
}
