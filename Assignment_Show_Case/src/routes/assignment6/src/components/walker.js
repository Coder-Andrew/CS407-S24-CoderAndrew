import { CustomObject } from '../systems/objectAnimations.js';

export async function createWalker() {
    const walker = new CustomObject('/assets/models/lowpoly_walker_tank.glb');
    await walker.loadModel();
    return walker;
}

// export async function createHanger() {
//     const hanger = new CustomObject('/assets/models/sci-fi_hanger.glb');
//     await hanger.loadModel();
//     return hanger;
// }

export async function createHanger() {
    const hanger = new CustomObject('/assets/models/airplane_hanger.glb');
    await hanger.loadModel();
    return hanger;
}