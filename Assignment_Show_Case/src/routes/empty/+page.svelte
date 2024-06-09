<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;
    let delta = 1/600;
    let ballMass = 100;

    async function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        //world.render();

        //world.start();

    }

    function handleDeltaChange(event) {
        console.log(delta);
        delta = event.target.value;
        world.changeDelta(1/delta);
    }

    onMount(() => {
        main();
    });

</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-2 text-center">
            <div class="form-group"> 
                <label for="delta">Time Scale (Higher = slower)</label>
                <input class="form-control" type="number" bind:value={delta} on:change={handleDeltaChange}/>
            </div>
            <div class="form-group">
                <label for="ballMass">Ball Mass: {ballMass}</label>
                <input class="form-control-range" type="range" min="1" max="1000" bind:value={ballMass} />  <!-- bind:value={} on:change={} -->
            </div>
        </div>
        <div class="col-10">    
            <div id="scene-container">
            </div>
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