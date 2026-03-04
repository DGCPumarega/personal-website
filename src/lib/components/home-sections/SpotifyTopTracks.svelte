<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";
  import { onMount } from "svelte";
  import * as HoverCard from "$lib/components/ui/hover-card";

  let {
    class: className,
    topTracks
  }: {
    class?: string,
    topTracks: SpotifyTrack[],
  } = $props();

  let scrollableTrackList: SpotifyTrack[] = $state([]);
  onMount(() => {
    topTracks.forEach(x => scrollableTrackList.push(x));
    topTracks.forEach(x => scrollableTrackList.push(x));
  });
</script>

<section class="{className} border-0! font-oxanium">
  <h3 class="text-xl leading-4">Top Tracks</h3>
  <p class="text-xs italic">zero-indexed, hexadecimal list</p>
  <div class="overflow-x-hidden w-full mt-2">
    <div class="flex gap-x-4 w-fit horizontal-scroll">
      {#each scrollableTrackList as track, index}
        <HoverCard.Root openDelay={0} closeDelay={0}>
          <HoverCard.Trigger class="w-20 h-fit">
            <img 
              class="w-20 h-20 rounded-sm"
              src={track.covers[0]} 
              alt="{track.name} album cover"
            />
            <p class="text-center">
              0x<span class="uppercase">{(index % 16).toString(16)}</span>
            </p>
          </HoverCard.Trigger>
          <HoverCard.Content class="font-oxanium bg-black/75 text-white min-w-fit">
            <p class="font-semibold text-xl text-nowrap">{track.name}</p>
            {#each track.artists as artist}
              <p class="text-sm italic mt-4 leading-1">{artist}</p>
            {/each}
          </HoverCard.Content>
        </HoverCard.Root>
      {/each}
    </div>
  </div>
</section>

<style>
  .horizontal-scroll {
    animation: infinite-scroll 120s infinite linear;
  }
  .horizontal-scroll:hover {
    animation-play-state: paused;
  }

  @keyframes infinite-scroll {
    from { transform: translateX(-50.45%); }
    to{ transform: translateX(0); }
  }
</style>