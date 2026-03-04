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
      <div class="flex flex-col gap-y-1.5">
        <div class="flex gap-x-1">
          <SpotifyMusicBars class="hidden sm:block" isPaused={false}/>
          <h3 class="sm:text-xl uppercase leading-4 w-fit text-nowrap sm:ml-7">Now Playing</h3>
          <SpotifyMusicBars class="hidden sm:block" isPaused={false}/>
        </div>
        <div class="flex gap-x-1">
          <div class="w-2 h-2 rounded-full bg-green-600 self-center"></div>
          <p class="text-xs uppercase">online</p>
        </div>
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
