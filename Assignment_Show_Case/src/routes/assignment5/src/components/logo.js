import { BufferGeometry, BufferAttribute, Mesh, MeshStandardMaterial } from "three";

let vertices1 = [
    0, -3, 0,
    1, 0, 0,
    0, 0, -1,
    -1, 0, 0,
    0, 0, 1,

    2, 1, 0,
    0, 1, -3,
    -2, 1, 0,
    0, 1, 3
];

let indices1 = [
    0, -3, 0,
    1, 0, 0,
    0, 0, -1,

    0, -3, 0,
    0, 0, -1,
    -1, 0, 0,

    0, -3, 0,
    -1, 0, 0,


];


let vertices = [
    1, 0, 0,
    0, 1, 0,
    -1, 0, 0,
    0, 0, -1,
];
let indices = [
    0, 1, 2,
    1, 3, 2,
    0, 3, 1,
    0, 2, 3,
];

export function createCustomObj(height = 4, width = 6, depth = 4) {
    const geometry = new BufferGeometry();
    const positionAttribute = new BufferAttribute(new Float32Array(vertices), 3);
    const indexAttribute = new BufferAttribute(new Uint16Array(indices), 1);

    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);




    const material = new MeshStandardMaterial({ color: 0x00ff00, wireframe: false});

    const customObj = new Mesh(geometry, material);

    return customObj;
}