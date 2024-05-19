<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;

    function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        world.render();
        world.animate();
    }

    onMount(() => {
        main();
    });
</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-1 text-center">
            <button class="btn btn-primary" on:click={world.togglePointLight}>Toggle Point Light</button>
            <button class="btn btn-secondary" on:click={world.toggleAmbientLight}>Toggle directional Light</button>
        </div>
        <div class="col-10">
    
            <div id="scene-container">
            
            </div>
        </div>
        <div class="">
            <p>The goal of this assignment is to learn how geometries are organized, represented and delivered to OpenGL and the graphics card. </p>
    
            <ul>
                Requirements are:
                <li>Construct a custom geometry object manually by specifying vertices and faces in an indexed buffer geometry.</li>                
                <li>Use per-vertex colors so we can pass custom attribute data to the vertex shader</li>
                <li>Implement orbit and optionally camera navigation through the scene</li>
                <li>Use the mouse to orbit and pan the camera: left mouse click (hold down) or single finger swipe to orbit, right mouse click (hold down), arrow keys, or two-finger swipe to pan; zoom with the scroll wheel or pinch gesture.</li>
            </ul>                            
        </div>
    </div>
</div>

<style>
    #scene-container {
        margin-left: 50px;
        width: 50vw;
        height: 90vh;
        background-color: skyblue;
    }

</style>