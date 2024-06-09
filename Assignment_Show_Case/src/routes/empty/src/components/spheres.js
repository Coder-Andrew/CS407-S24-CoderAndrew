import { SphereGeometry, BoxGeometry, Mesh, MeshBasicMaterial, BufferGeometry, ShaderMaterial, Vector3 } from "three";

// Vertex shader CHATGPT
const vertexShader = `
    uniform float xValue;
    uniform float yValue;
    uniform float zValue;
    varying vec3 vPosition;

    void main() {
        vPosition = position;

        // Combine uniforms to form the black hole position
        vec3 blackHolePosition = vec3(xValue, yValue, zValue);

        // Calculate the direction from the vertex to the black hole
        vec3 direction = blackHolePosition - position;
        float distance = length(direction);

        // Apply the warp effect based on distance
        vec3 warpedPosition = position + normalize(direction) * (1.0 / distance);

        // Transform the vertex position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(warpedPosition, 1.0);
    }
`;

// Fragment shader CHATGPT
const fragmentShader = `
    varying vec3 vPosition;

    void main() {
        // Simple color based on position
        gl_FragColor = vec4(vPosition * 0.5 + 0.5, 1.0);
    }
`;

// const vertexShader = `
//     uniform float xValue;
//     uniform float yValue;
//     uniform float zValue;
//     varying vec3 vPosition;
//     varying float vDistance;

//     void main() {
//         vPosition = position;

//         // Combine uniforms to form the black hole position
//         vec3 blackHolePosition = vec3(xValue, yValue, zValue);

//         // Calculate the direction from the vertex to the black hole
//         vec3 direction = blackHolePosition - position;
//         float distance = length(direction);

//         // Apply a stronger warp effect based on distance
//         float strength = 1.0 / (distance * distance + 0.1); // Stronger influence with smoother falloff
//         vec3 warpedPosition = position + normalize(direction) * strength;

//         // Store the distance for use in the fragment shader
//         vDistance = distance;

//         // Transform the vertex position
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(warpedPosition, 1.0);
//     }
// `;



// const fragmentShader = `
//     varying vec3 vPosition;
//     varying float vDistance;

//     void main() {
//         // Color intensity based on distance, more intense near the black hole
//         float intensity = 1.0 / (vDistance + 1.0); // Ensures no division by zero and smooth intensity gradient

//         // Simple color gradient based on intensity
//         vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 0.5, 0.0), intensity); // Blend from black to orange
//         gl_FragColor = vec4(color, 1.0);
//     }
// `;






function createCube() {
    const geometry = new SphereGeometry(2, 200, 200);

    const material = new MeshBasicMaterial({ color: 0x00ff00});

    const cube = new Mesh(geometry, material);

    return cube;
}

export function createBlackHoleCube() {
    const geometry = new SphereGeometry(2, 2000, 2000);
    const material = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            xValue: { value: 0.0 },
            yValue: { value: 0.0 },
            zValue: { value: 0.0 },
            },
        }
    );
    const cube = new Mesh(geometry, material);

    return cube;
}

export { createCube };