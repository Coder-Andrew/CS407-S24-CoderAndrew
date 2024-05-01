<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let pointLightEnabled, directionalLightEnabled;

    let world;

    function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        world.render();
        world.animate();
    }

    function handleKeydown(event) {
        switch(event.key) {
            case 'w':
                world.elevateTurret(0.01);
                break;
            case 'a':
                world.slewTurret(0.05);
                break;
            case 's':
                world.elevateTurret(-0.01);
                break;
            case 'd':
                world.slewTurret(-0.05);
                break;
            case 'Shift':
                world.moveTank(1);
                break;
            case 'Control':
                world.moveTank(-1);
                break;
            case "ArrowLeft":
                world.rotateTank(0.05);
                break;

            case 'e':
                world.shootTurret();
                break;

            case "ArrowRight":
                world.rotateTank(-0.05);
                break;
            default:
                // Handle other keys
        }
    }

    onMount(() => {
        main();
    });


</script>

<svelte:window on:keydown="{handleKeydown}" />
<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-1 text-center">

            <!-- <label for="toggle-point-light">Toggle Point Light</label>
            <input type="checkbox" checked on:click={world.togglePointLight()} />

            <label for="toggle-directional-light">Toggle Directional Light</label>
            <input type="checkbox" checked on:click={world.toggleDirectionalLight()} />             -->

            <input type="button" class="btn btn-info" value="Toggle Animation" on:click={() => world.toggleAnimation()} />
            <input type="button" class="btn btn-danger" value="Reset Camera" on:click={() => world.resetCamera()} />
            <input type="button" class="btn btn-primary" value="Follow Orbit" on:click={() => world.followOrbit()} />
            <input type="button" class="btn btn-secondary" value="Follow Tank" on:click={() => world.followTank()} />
        </div>
        <div class="col-11">
    
            <div id="scene-container">
            
            </div>
        </div>
    </div>
    <article class="description">
        <p>The goal of this assignment is to create a simple scene using a hierarchical scene graph as shown in <a href="https://discoverthreejs.com/book/first-steps/transformations/">Transformations, Coordinate Systems, and the Scene Graph</a> in the Discover three.js book.</p>  Requirements are:
        <ul>
            <li>Construct a compound model composed of a primary object and multiple child objects</li>
            <li>Place those child objects relative to the parent using transformations, at least one of which we create manually using vector or matrix algebra</li>
            <li>Have interactivity that moves both the entire object as well as the children</li>
        </ul>
        <p>For the axes: X (red), Y (green) and Z (blue)</p>
        <p>Keyboard controls: WASD (rotates the child objects about their own local origin)  Only works if the canvas element has focus.  Click it if key press doesn't do anything.</p>
    </article>
</div>

<style>
    #scene-container {
        margin-left: 50px;
        width: 50vw;
        height: 90vh;
        background-color: skyblue;
    }

</style>