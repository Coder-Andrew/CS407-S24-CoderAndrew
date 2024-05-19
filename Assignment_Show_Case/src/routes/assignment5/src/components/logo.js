import { BufferGeometry, BufferAttribute, Mesh, MeshPhongMaterial } from "three";

let vertices = [
    0, -3, 0,   // 0
    1, 0, 0,    // 1
    0, 0, 1,    // 2
    -1, 0, 0,   // 3
    0, 0, -1,   // 4
    0, 0, 1,    // 5


    2, 1, 0,    // 6
    0, 1, -3,   // 7
    -2, 1, 0,   // 8
    0, 1, 3,    // 9

    0.5, 0, 0.5,    // 10
    0.5, 0, -0.5,   // 11
    -0.5, 0, -0.5,  // 12
    -0.5, 0, 0.5,   // 13
];

let indices = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 1,

    // 6
    6, 7, 8,
    6, 8, 9,

    10, 6, 9,
    2, 10, 9,
    1, 6, 10,

    11, 7, 6,
    1, 11, 6,
    11, 4, 7,

    12, 7, 4,
    12, 8, 7,
    12, 3, 8,

    13, 9, 8,
    13, 5, 9,
    3, 13, 8,
];


export function createCustomObj(height = 4, width = 6, depth = 4) {
    const geometry = new BufferGeometry();
    const positionAttribute = new BufferAttribute(new Float32Array(vertices), 3);
    const indexAttribute = new BufferAttribute(new Uint16Array(indices), 1);

    geometry.setAttribute('position', positionAttribute);
    geometry.setIndex(indexAttribute);
    let colors = generateColors();
    geometry.setAttribute('color', new BufferAttribute(new Float32Array(colors), 3));

    const material = new MeshPhongMaterial({ color: 0xFFA500, wireframe: false, vertexColors: true, flatShading: true});

    const customObj = new Mesh(geometry, material);

    return customObj;
}

function generateColors() {
    const colors = [
        222, 58, 47,    // 0
        222, 58, 47,    // 1
        222, 58, 47,    // 2
        222, 58, 47,    // 3
        61, 47, 222,    // 4
        61, 47, 222,    // 5
        61, 47, 222,    // 6
        61, 47, 222,    // 7
        58, 222, 47,    // 8
        58, 222, 47,    // 9
        58, 222, 47,    // 10
        58, 222, 47,    // 11
        187, 47, 222,   // 12
        187, 47, 222,   // 13
        187, 47, 222,   // 14
        187, 47, 222,   // 15
    ];
    // Normalize the color values to the range [0, 1]            
    return colors.map((c, i) => c / 255);
}