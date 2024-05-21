import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { setupModel } from "./setupModel";


export async function loadModels() {
    const loader = new GLTFLoader();
    
    try {
        const [hangerData] = await Promise.all([
            loader.loadAsync('../assets/models/sci-fi_hanger.glb'),
        ]);

        console.log(hangerData);

        const hanger = setupModel(hangerData);
    
        return { hanger }


    } catch (error) {
        console.error('Error loading model:', error);
    }
}
