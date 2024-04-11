<script>
    console.log("Hello world");

    import { onMount } from 'svelte';
    import {
        BoxGeometry,
        ConeGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
    } from './../../../node_modules/three/build/three.module.js';
    
    
    // Get a reference to the container element that will hold our scene
    let container; 

    let isAnimated = true;
    let animationId;

    let isWireframe = false;
    let object;
    let renderer;
    let scene;
    let camera;
    
    let anime;

    let xRotation = 0;
    let yRotation = 0;
    let zRotation = 0;

    let red = 0;
    let green = 0;
    let blue = 0;
    
    
    //= document.querySelector('#scene-container');

    onMount(() => {
        scene = new Scene();
    
        scene.background = new Color('skyblue');
    
        const fov = 35;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 100; 
    
        camera = new PerspectiveCamera(fov, aspect, near, far);
    
        camera.position.set(0,0,10);
    
        const geometry = new ConeGeometry(2,3)//new BoxGeometry(2,2,2);
    
        const material = new MeshBasicMaterial({color: 0xFFFF00,});
    
        object = new Mesh(geometry, material, material.wireframe = isWireframe);
    
        scene.add(object);
    
        renderer = new WebGLRenderer();
    
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
    
        container.append(renderer.domElement);

        anime = function animate() {
            animationId = requestAnimationFrame( animate );
    
            object.rotation.x += xRotation;
            object.rotation.y += yRotation;
            object.rotation.z -= zRotation;
            
            renderer.render(scene, camera);
        }
        anime();
    })

    function toggleAnimation() {
        isAnimated = !isAnimated;
        if (isAnimated) {
            requestAnimationFrame(anime);
        } else {
            cancelAnimationFrame(animationId);
        }
    
    }

    function toggleWireframe() {
        isWireframe = !isWireframe;
        object.material.wireframe = isWireframe;
        renderer.render(scene, camera);
    }

    function resetRotation() {
        xRotation = 0;
        yRotation = 0;
        zRotation = 0;
    }

    function resetObjectRotation() {
        object.rotation.set(0,0,0);
    }

    function updateColor() {
        object.material.color = new Color(`rgb(${red}, ${green}, ${blue})`);
        renderer.render(scene, camera);
    }
 
</script>


<div class="container">
    <div class="row">
        <div class="col-2">
            <button class="btn btn-primary mb-5" on:click={toggleAnimation}>{!isAnimated ? "Start" : "Stop"} Animation</button>
            <button class="btn btn-secondary mb-5" on:click={toggleWireframe}>{!isWireframe ? "Show" : "Hide"} Wireframe</button>

            <button class="btn btn-info mb-1" on:click={resetObjectRotation}>Reset Orientation</button>
            <button class="btn btn-info" on:click={resetRotation}>Reset Rotation</button>
            <label for="xRotation">X Rotation: {xRotation}</label>
            <input type="range" min="-0.5" max="0.5" step="0.01" bind:value={xRotation} />
            <label for="yRotation">Y Rotation: {yRotation}</label>
            <input type="range" min="-0.5" max="0.5" step="0.01" bind:value={yRotation} />
            <label for="zRotation">Z Rotation: {zRotation}</label>
            <input type="range" min="-0.5" max="0.5" step="0.01" bind:value={zRotation} />

            <label for="red" class="mt-5">Red</label>
            <input type="range" min="0" max="255" step="1" bind:value={red} on:input={updateColor} />
            <label for="green">Green</label>
            <input type="range" min="0" max="255" step="1" bind:value={green} on:input={updateColor} />
            <label for="blue">Blue</label>
            <input type="range" min="0" max="255" step="1" bind:value={blue} on:input={updateColor} />

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


