<script lang="ts">
  import type { SpotifyTrack } from "$lib/types";
  import SpotifyNowPlaying from "$lib/components/home-sections/SpotifyNowPlaying.svelte";
  import SpotifyLastPlayed from "$lib/components/home-sections/SpotifyLastPlayed.svelte";
  import SpotifyRecentTracks from "$lib/components/home-sections/SpotifyRecentTracks.svelte";
    import SpotifyTopTracks from "./SpotifyTopTracks.svelte";

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
  <div class="mb-7">
    <h2 class="text-xl sm:text-3xl uppercase font-bold text-center">Stuff I Listen To</h2>
    <p class="text-xs sm:text-sm italic leading-3 text-center">
      thanks to 
      <span class="text-green-400 font-semibold not-italic">Spotify</span> 
      for their awesome 
      <a class="underline text-blue-200 underline-offset-2 font-semibold" href="https://developer.spotify.com/documentation/web-api" target="_blank">
        API
      </a>!
    </p>
  </div>

  {#if recentTracks && topTracks}
    {#if nowPlaying}
      <SpotifyNowPlaying nowPlaying={nowPlaying} />
      {:else}
      <SpotifyLastPlayed recentTracks={recentTracks} />
    {/if}
    <SpotifyRecentTracks class="mt-10" recentTracks={recentTracks} />
    <SpotifyTopTracks class="mt-3" topTracks={topTracks} />
    {:else}
    <div class="h-full w-full flex align-middle justify-center">
      <h3 class="text-3xl">Unable to Load Data</h3>
    </div>
  {/if}

</section>