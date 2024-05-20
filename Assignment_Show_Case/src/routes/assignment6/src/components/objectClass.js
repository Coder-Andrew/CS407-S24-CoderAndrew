import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AnimationMixer } from "three";

class CustomObject {
    constructor(pathToModel) {
        this.pathToModel = pathToModel;
        this.gtlfLoader = new GLTFLoader();

        this.animations = []; // Array of animations

        this.model = this.loadModel();
    }

    async loadModel() {
        try {
            const [modelData] = await Promise.all([
                this.gtlfLoader.loadAsync(this.pathToModel),
            ]);

            console.log(modelData);

            const model = this.setupModel(modelData);

            return { model }

        } catch (error) {
            console.error('Error loading model:', error);
        }
    }

    setupModel(data) {
        // add animations/clips to this.animations array so that they can be played later
        const model = data.scene.children[0];

        const mixer = new AnimationMixer(model);
        const action = mixer.clipAction(clip);

        data.animations.forEach(element => {
            this.animations.push(mixer.clipAction(element));
        });


        model.tick = (delta) => mixer.update(delta);

        return model;

    }
}