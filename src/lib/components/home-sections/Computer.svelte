<script lang="ts">
  import { Canvas } from "@threlte/core";
  import IBM5155 from "$lib/components/scenes/IBM5155.svelte";

  let { class: className }: { class?: string } = $props();
</script>

<div class={className}>
  <Canvas>
    <IBM5155 />
  </Canvas>
</div>