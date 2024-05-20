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
                case 'ArrowUp':
                    world.startWalker();
                    break;
            }
        });
    
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowUp':
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