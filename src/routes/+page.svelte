<script lang="ts">
  import type { PageProps } from "./$types";

  import Welcome from "$lib/components/home-sections/Welcome.svelte"
  import Outlinks from "$lib/components/home-sections/Outlinks.svelte";
  import Projects from "$lib/components/home-sections/Projects.svelte";
  import Chip8 from "$lib/components/home-sections/Chip8.svelte";
  import Blog from "$lib/components/home-sections/Blog.svelte";
  import Guestbook from "$lib/components/home-sections/Guestbook.svelte";
  import Computer from "$lib/components/home-sections/Computer.svelte";
  import Spotify from "$lib/components/home-sections/Spotify.svelte";
  import Status from "$lib/components/home-sections/Status.svelte";

  let { data }: PageProps = $props();
</script>

<div class="grid grid-cols-12 gap-2 mx-4 opacity-60 lg:mx-auto lg:w-250">
  <Welcome class="col-span-12 lg:col-span-9 lg:row-span-2" />
  <Blog
    class="col-span-12 sm:col-span-4 lg:row-span-3 lg:col-span-3" 
    posts={data.blogPosts}
  />
  <Projects class="col-span-12 sm:col-span-8 lg:row-span-2 lg:col-span-6" />
  <Chip8 class="col-span-12 sm:col-span-4 lg:col-span-3"/>
  <section class="flex flex-col align-middle justify-center col-span-12 sm:col-span-4 lg:col-span-3 border-none! bg-transparent! p-0!">
    <h2 class="sr-only">Computer</h2>
    <Computer class="w-full h-full" />
  </section>
  <Outlinks class="col-span-12 sm:col-span-4 lg:col-span-3" />
  <Guestbook
    class="col-span-12 lg:col-span-6 lg:row-span-2"
    formProp={data.form}
    messages={data.guestbookMessages} 
  />
  <Status class="col-span-12 lg:col-span-6" status={data.status}/>
  <Spotify
    class="col-span-12 lg:col-span-6"
    nowPlaying={data.nowPlaying}
    recentTracks={data.recentTracks}
    topTracks={data.topTracks}
  />
</div>
