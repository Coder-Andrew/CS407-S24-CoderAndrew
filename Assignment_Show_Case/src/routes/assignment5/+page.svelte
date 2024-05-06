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