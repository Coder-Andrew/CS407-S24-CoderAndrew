<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;

    async function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        await world.init();
        world.render();

        world.start();

    }

    onMount(() => {
        main();
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                    world.startWalker();
                    break;
                case "a":
                    world.turnWalker(-1);
                    break;
                case "d":
                    world.turnWalker(1);
                    break;
            }
        });
    
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                    world.stopWalker();
                    break;
            }
        });
    });


</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-1 text-center">
        </div>
        <div class="col-11">
    
            <div id="scene-container">
            
            </div>
        </div>
        <div class="text-center">
            <p>Hold 'w' to start the walker</p>
            <p>Use 'a' and 'd' to turn the walker</p>
        </div>
        <ul>Requirements are:
            <li>Load a pre-made model from a GLTF file, that contains one or more geometries with materials and animation clips.</li>
            <li>Use the three.js animation system</li>
            <li>Exercise both of these with some form of interactive control.</li>
        </ul>
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