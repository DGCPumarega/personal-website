<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";
  import SpotifyNowPlaying from "$lib/components/home-sections/SpotifyNowPlaying.svelte";
  import SpotifyLastPlayed from "$lib/components/home-sections/SpotifyLastPlayed.svelte";
  import SpotifyRecentTracks from "$lib/components/home-sections/SpotifyRecentTracks.svelte";

  let {
    class: className,
    nowPlaying,
    recentTracks,
    topTracks,
  }: {
    class?: string,
    nowPlaying: SpotifyTrack | null,
    recentTracks: SpotifyTrack[] | null,
    topTracks: SpotifyTrack[] | null,
  } = $props();
</script>

<section class={className}>
  <h2 class="text-xl sm:text-3xl text-center uppercase font-bold mb-10">Stuff I Listen To</h2>
  <p class="text-sm italic"></p>

  {#if recentTracks && topTracks}
    {#if nowPlaying}
      <SpotifyNowPlaying nowPlaying={nowPlaying} />
      {:else}
      <SpotifyLastPlayed recentTracks={recentTracks} />
    {/if}
    <SpotifyRecentTracks class="mt-10" recentTracks={recentTracks} />
    {:else}
    <div class="h-full w-full flex align-middle justify-center">
      <h3 class="text-3xl">Unable to Load Data</h3>
    </div>
  {/if}

</section>