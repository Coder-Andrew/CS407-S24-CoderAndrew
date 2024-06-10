<script>
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    let world;
    let numberOfBalls;

    async function main() {
        const container = document.getElementById('scene-container');

        world = new World(container);
        await world.init();
        
        world.render();
        world.start();

        numberOfBalls = world.getNumberOfRemainingBalls();

    }

    onMount(() => {
        main();

        document.addEventListener('keydown', (e) => {
            updateNumberOfBalls();
            if (e.code === 'Space') {
                world.spawnSphere();
            }
        });
    });

    function updateNumberOfBalls() {
        numberOfBalls = world.getNumberOfRemainingBalls();
    }
</script>


<div class="container">
    <div class="row d-flex align-items-center">
        <div class="col-2 text-center">
            <!-- <p>Balls remaining: {numberOfBalls}</p> -->
            <p>Press Space to spawn balls</p>
            <button class="btn btn-primary" on:click={world.clearBalls}>Clear Balls</button>
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