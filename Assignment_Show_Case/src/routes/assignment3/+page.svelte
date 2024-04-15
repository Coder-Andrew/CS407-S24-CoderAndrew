<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let pointLightEnabled, directionalLightEnabled;

    let world;

    function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        world.render();
    }

    onMount(() => {
        main();
    });


</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-1 text-center">

            <label for="toggle-point-light">Toggle Point Light</label>
            <input type="checkbox" checked on:click={world.togglePointLight()} />

            <label for="toggle-directional-light">Toggle Directional Light</label>
            <input type="checkbox" checked on:click={world.toggleDirectionalLight()} />            
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