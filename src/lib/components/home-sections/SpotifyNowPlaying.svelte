<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";

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
    <img class="w-30 h-30" src={nowPlaying.covers[0]} alt="album cover" />
    <div class="flex flex-col justify-between">
      <div>
        <h3 class="text-lg uppercase">Now Playing</h3>
      </div>
      <div class="leading-5">
        <p class="font-semibold">{nowPlaying.name}</p>
        <div class="flex gap-x-3">
          {#each nowPlaying.artists as artist}
            <p class="text-sm">{artist}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>