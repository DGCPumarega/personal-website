<script lang="ts">
  import type { PageProps } from "./$types";
  import Welcome from "$lib/components/home-sections/Welcome.svelte"
  import Outlinks from "$lib/components/home-sections/Outlinks.svelte";
  import Projects from "$lib/components/home-sections/Projects.svelte";
  import Chip8 from "$lib/components/home-sections/Chip8.svelte";
  import Blog from "$lib/components/home-sections/Blog.svelte";
  import Guestbook from "$lib/components/home-sections/Guestbook.svelte";

  let { data }: PageProps = $props();
</script>

<div class="grid grid-cols-1 gap-2 mx-4 sm:grid-cols-3 lg:mx-auto lg:grid-cols-12 lg:grid-rows-6 lg:w-250">
  <Welcome class="sm:col-span-2 lg:col-span-9 lg:row-span-2" />
  <Blog posts={data.posts} class="lg:row-span-3 lg:col-span-3" />
  <Projects class="lg:row-span-2 lg:col-span-6" />
  <section class="flex justify-center lg:col-span-3">Placeholder 2</section>
  <Chip8 class="lg:col-span-3"/>
  <Outlinks class="lg:col-span-3" />
  <Guestbook class="lg:col-span-6 lg:row-span-2"/>
  <section class="flex justify-center lg:col-span-6 lg:row-span-2">Placeholder 3</section>
</div>
