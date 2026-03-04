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
      <div class="flex flex-col gap-y-1.5">
        <div class="flex gap-x-1">
          <SpotifyMusicBars class="hidden sm:block" isPaused={true} />
          <h3 class="text-xl uppercase leading-4 w-fit text-nowrap sm:ml-7">Last Played</h3>
          <SpotifyMusicBars class="hidden sm:block" isPaused={true }/>
        </div>
        <div class="flex gap-x-1">
          <div class="w-2 h-2 rounded-full bg-red-600 self-center"></div>
          <p class="text-xs uppercase">offline</p>
        </div>
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
