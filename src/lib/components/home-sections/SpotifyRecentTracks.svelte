<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";

  let {
    class: className,
    recentTracks
  }: {
    class?: string,
    recentTracks: SpotifyTrack[],
  } = $props();
</script>

<section class="{className} border-0! font-oxanium">
  <h3 class="text-xl mb-2">Recently Played</h3>
  <div class="overflow-x-hidden w-full">
    <div class="flex gap-x-4 w-fit horizontal-scroll">
      {#each recentTracks as track}
        <img 
          class="w-20 h-20 mx-auto border"
          src={track.covers[0]} 
          alt="{track.name} album cover"
        />
      {/each}
      {#each recentTracks as track}
        <img 
          class="w-20 h-20 mx-auto border"
          src={track.covers[0]} 
          alt="{track.name} album cover"
        />
      {/each}
    </div>
  </div>
</section>

<style>
  .horizontal-scroll {
    animation: infinite-scroll 30s infinite linear;
  }
  .horizontal-scroll:hover {
    animation-play-state: paused;
  }

  @keyframes infinite-scroll {
    from { transform: translateX(0); }
    to{ transform: translateX(-208%); }
  }
</style>