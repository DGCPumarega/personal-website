<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";
  import SpotifyMusicBars from "$lib/components/home-sections/SpotifyMusicBars.svelte";

  let {
    class: className,
    nowPlaying,
  }: {
    class?: string,
    nowPlaying: SpotifyTrack,
  } = $props();
</script>

<section class="{className} border-0! font-oxanium">
  <div class="flex gap-x-4">
    <img
      class="w-30 h-30 rounded-sm"
      src={nowPlaying.covers[0]}
      alt="album cover"
    />
    <div class="flex flex-col justify-between w-full">
      <div class="flex gap-x-1">
        <SpotifyMusicBars isPaused={false}/>
        <h3 class="text-xl uppercase leading-4 w-fit text-nowrap ml-9">Now Playing</h3>
        <SpotifyMusicBars isPaused={false}/>
      </div>
      <div>
        <p class="font-semibold text-lg overflow-x-clip text-nowrap">{nowPlaying.name}</p>
        <div class="flex gap-x-3 overflow-x-clip">
          {#each nowPlaying.artists as artist}
            <p class="text-sm leading-2 italic">{artist}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
