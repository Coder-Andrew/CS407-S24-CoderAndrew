<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;
    let xVal = 0, yVal = 0, zVal = 0;

    async function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        await world.init();
        world.render();
        
        world.updateCoordinates({x: xVal, y: yVal, z: zVal});
        world.start();

    }

    onMount(() => {
        main();
    });

    function resetSliders() {
        xVal = 0;
        yVal = 0;
        zVal = 0;
        world.updateCoordinates({x: xVal, y: yVal, z: zVal});
    }
</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-1 text-center">
            <label class="mt-5 mb-2" for="xRange">X: {xVal}</label>
            <input type="range" class="form-range" bind:value={xVal} on:input={world.updateCoordinates({x: xVal, y: yVal, z: zVal})} min="-2" max="2" step="0.05"/>

            <label for="yRange" class="mt-5">Y: {yVal}</label>
            <input type="range" class="form-range" bind:value={yVal} on:input={world.updateCoordinates({x: xVal, y: yVal, z: zVal})} min="-2" max="2" step="0.05"/>

            <label class="mt-5" for="zRange">Z: {zVal}</label>
            <input type="range" class="form-range" bind:value={zVal} on:input={world.updateCoordinates({x: xVal, y: yVal, z: zVal})} min="-2" max="2" step="0.05"/>

            <button class="btn btn-primary mt-5" on:click={resetSliders}>Reset</button>
        </div>
        <div class="col-11">    
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