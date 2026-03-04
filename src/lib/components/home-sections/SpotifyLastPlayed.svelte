<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";
  import SpotifyMusicBars from "$lib/components/home-sections/SpotifyMusicBars.svelte";

  let {
    class: className,
    recentTracks
  }: {
    class?: string,
    recentTracks: SpotifyTrack[],
  } = $props();
</script>

<section class="{className} border-0! font-oxanium">
  <div class="flex gap-x-4">
    <img class="w-30 h-30" src={recentTracks[0].covers[0]} alt="album cover" />
    <div class="flex flex-col justify-between w-full">
      <div class="flex gap-x-1">
        <SpotifyMusicBars isPaused={true} />
        <h3 class="text-xl uppercase leading-4 w-fit text-nowrap ml-9">Last Played</h3>
        <SpotifyMusicBars isPaused={true }/>
      </div>
      <div class="leading-5">
        <p class="font-semibold text-lg overflow-x-clip text-nowrap">{recentTracks[0].name}</p>
        <div class="flex gap-x-3 overflow-x-clip">
          {#each recentTracks[0].artists as artist}
            <p class="text-sm italic leading-2">{artist}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
