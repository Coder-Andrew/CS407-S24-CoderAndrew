<script lang="ts">
	import { onMount } from "svelte";
    import { World } from './src/world.js'

    function main() {
        const container = document.getElementById('scene-container');

        const world = new World(container);

        world.render();
    }

    onMount(() => {
        main();
    });

</script>

<div id="scene-container">

</div>