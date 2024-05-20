import { CustomObject } from './objectAnimations.js';

export async function createWalker() {
    const walker = new CustomObject('/assets/models/lowpoly_walker_tank.glb');
    await walker.loadModel();
    return walker;
}