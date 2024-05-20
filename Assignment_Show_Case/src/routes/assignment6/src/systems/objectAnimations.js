import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer } from "three";

export class CustomObject {
    constructor(pathToModel) {
        this.pathToModel = pathToModel;
        this.gltfLoader = new GLTFLoader();
        this.animations = {}; // Object to store animations by name
        this.mixer = null; // AnimationMixer instance
        this.model = null; // Model instance
    }

    async loadModel() {
        try {
            const modelData = await this.gltfLoader.loadAsync(this.pathToModel);
            //console.log(modelData);
            this.model = this.setupModel(modelData);
            return { model: this.model };
        } catch (error) {
            console.error('Error loading model:', error);
        }
    }

    setupModel(data) {
        // Assume the model is the first child in the scene
        const model = data.scene.children[0];

        this.mixer = new AnimationMixer(model);
        data.animations.forEach((clip) => {
            const action = this.mixer.clipAction(clip);
            this.animations[clip.name] = action; // Store the action by clip name
        });

        model.tick = (delta) => this.mixer.update(delta);

        return model;
    }

    playAnimation(name) {
        if (this.animations[name]) {
            this.animations[name].play();
        } else {
            console.warn(`Animation "${name}" not found.`);
        }
    }

    stopAnimation(name) {
        if (this.animations[name]) {
            this.animations[name].stop();
        } else {
            console.warn(`Animation "${name}" not found.`);
        }
    }

    swapAnimation(oldName, newName) {
        if (this.animations[oldName]) {
            this.animations[oldName].stop();
        }
        if (this.animations[newName]) {
            this.animations[newName].play();
        }
    }
}

