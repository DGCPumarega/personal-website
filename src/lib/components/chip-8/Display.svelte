<script lang="ts">
  import { onMount } from "svelte";

  let rows: boolean[] = $state([false])
  let cols: boolean[] = $state([false])

  let { pixels }: { pixels: boolean[][] } = $props();

  onMount(() => {
    rows = Array.from({ length: pixels.length });
    cols = Array.from({ length: pixels[0].length });
  });

  $effect(() => {
    for(let i = 0; i < pixels.length; i++) {
      for(let j = 0; j < pixels[0].length; j++) {
        if(pixels[i][j]) { console.log(`ON: ${i}, ${j}`); }
      }
    }
  });
</script>

<div class="ch8-display">
  {#each rows as _, y}
    {#each cols as _, x}
      <div class="bg-white"></div>
    {/each}
  {/each}
</div>

<style>
  .ch8-display {
    display: grid;
    grid-template-columns: repeat(64, 10px);
    grid-template-rows: repeat(32, 10px);
    gap: 2px;
  }
</style>
