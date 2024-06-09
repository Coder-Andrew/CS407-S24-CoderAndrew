<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;
    let delta = 1/600;
    let ballMass = 25;

    async function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        //world.render();

        //world.start();

    }

    function handleDeltaChange(event) {
        delta = event.target.value;
        world.changeDelta(1/delta);
    }
    function handleBallMassChange(event) {
        ballMass = event.target.value;
        world.changeBallMass(ballMass);
    }

    onMount(() => {
        main();
    });

</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-2 text-center">
            <div class="form-group mb-3"> 
                <label for="delta">Time Scale (Higher = slower)</label>
                <input class="form-control-range" type="range" min="60" max="1000" bind:value={delta} on:change={handleDeltaChange}/>
            </div>
            <div class="form-group mb-3">
                <label for="ballMass">Ball Mass: {ballMass}</label>
                <input class="form-control-range" type="range" min="1" max="25" bind:value={ballMass} on:change={handleBallMassChange} />  <!-- bind:value={} on:change={} -->
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