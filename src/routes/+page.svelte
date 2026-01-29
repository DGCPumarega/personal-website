<script lang="ts">
  import Welcome from "$lib/components/sections/Welcome.svelte"
  import Outlinks from "$lib/components/sections/Outlinks.svelte";
  import Projects from "$lib/components/sections/Projects.svelte";
  import Chip8 from "$lib/components/sections/Chip8.svelte";
</script>

<main class="grid grid-cols-1 gap-2 mx-4 mt-3 sm:grid-cols-3 lg:mx-auto lg:grid-cols-4 lg:w-250">
  <Welcome class="sm:col-span-2 lg:col-span-3" />
  <Projects class="" />
  <Outlinks class="" />
  <Chip8 />
  <section class="flex justify-center">Placeholder 2</section>
  <section class="flex justify-center">Placeholder 3</section>
  <section class="flex justify-center">Placeholder 4</section>
  <section class="flex justify-center">Placeholder 5</section>
</main>
