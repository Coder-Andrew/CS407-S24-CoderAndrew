<script>
    console.log("Hello world");

    import { onMount } from 'svelte';
    import {
        BoxGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
    } from './../../../node_modules/three/build/three.module.js';
	import { Wireframe } from 'three/examples/jsm/Addons.js';
    
    let animationId;
    let isAnimated = true;
    
    // Get a reference to the container element that will hold our scene
    let container;  
    
    
    //= document.querySelector('#scene-container');

    onMount(() => {
        const scene = new Scene();
    
        scene.background = new Color('skyblue');
    
        const fov = 35;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 100; 
    
        const camera = new PerspectiveCamera(fov, aspect, near, far);
    
        camera.position.set(0,0,10);
    
        const geometry = new BoxGeometry(2,2,2);
    
        const material = new MeshBasicMaterial();
    
        const cube = new Mesh(geometry, material, material.wireframe = true);
    
        scene.add(cube);
    
        const renderer = new WebGLRenderer();
    
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    
        container.append(renderer.domElement);

        function animate() {
            animationId = requestAnimationFrame( animate );
    
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        }
        animate();
        })
        
    </script>


<div class="container">
    <div class="row">
        <div class="col-2">
            <button class="btn btn-primary mb-5">Start Animation</button>
            <button class="btn btn-secondary mt-5">Show Wireframe</button>
        </div>
        <div class="col-8" id="scene-container" bind:this={container}>
            
        </div>
        <div class="col-2">
            <p>The goal of this assignment is to prove the architecture we'll be using to display WebGL 3D graphics in a web application. We want to show that we can successfully</p>
            <ul>
                <li>Use the three.js library to create a 3D scene</li>
                <li>Render the scene to a canvas element</li>
                <li>Control the animation fo the scene</li>
                <li>All in a Svelte app</li>
                <li>Deployed to the Web</li>
            </ul>
        </div>
    </div>
</div>


