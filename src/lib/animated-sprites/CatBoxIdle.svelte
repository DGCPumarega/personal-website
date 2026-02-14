<script lang="ts">
  import CatBoxIdle from "$lib/assets/spritesheets/cat-box-idle.png";

  let {class: className}: {class?: string} = $props();
</script>

<div class={className} id="cat-box-idle" style="--spritesheet-url: url({CatBoxIdle})"></div>

<style>
  #cat-box-idle {
    background: var(--spritesheet-url);
    width: 32px;
    height: 32px;
    animation: sprite 1.1s steps(4) infinite;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
  }
  @keyframes sprite {
    to { background-position: -128px;}
  }
</style>