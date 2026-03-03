<script lang="ts">
  let { class: className}: {class?: string} = $props();
</script>

<div class="container {className} flex gap-x-1">
  <div class="music-bar"></div>
</div>

<style>
  .music-bar {
    width: 8px;
    animation: bounce
  }
</style>
