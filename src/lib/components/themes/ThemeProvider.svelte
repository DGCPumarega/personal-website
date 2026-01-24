<script lang="ts">
  import ThemeSpace from "$lib/components/themes/ThemeSpace.svelte";

	let { children } = $props();
</script>

<div>
  <!-- 
    TODO: More themes 
   -->
  <ThemeSpace>{@render children()}</ThemeSpace>
</div>
