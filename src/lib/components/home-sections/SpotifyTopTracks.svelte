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
  <h3 class="text-xl leading-4">Top 16 Tracks</h3>
  <p class="text-xs italic">zero-indexed, hexadecimal</p>
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
            <div class="flex gap-x-1 justify-center align-middle">
              {#if index % 16 === 0 || index % 16 === 1  || index % 16 === 2}
                <svg class="w-3.5 h-3.5 self-center {index % 16 === 0 ? 'fill-[#EFBF04]' : index % 16 === 1 ? 'fill-[#C0C0C0]' : 'fill-[#CD7F32]'}" viewBox="0 0 491.768 491.768" xml:space="preserve">
                  <g id="XMLID_439_">
                    <path id="XMLID_440_" d="M174.048,136.543l39.925-83.12l18.234-37.966l-2.938-6.131C226.54,3.628,220.778,0,214.453,0H98.137 c-5.651,0-10.899,2.906-13.918,7.689c-3.001,4.783-3.338,10.772-0.898,15.859l72.508,150.957L174.048,136.543z"/>
                    <path id="XMLID_441_" d="M407.548,7.689C404.53,2.906,399.281,0,393.63,0h-116.3c-6.323,0-12.088,3.628-14.815,9.326 l-89.814,187.012c-0.065,0.145-0.081,0.289-0.146,0.433c-0.143,0.322-0.209,0.675-0.337,1.013 c-0.577,1.559-0.913,3.211-0.994,4.959c-0.017,0.242-0.145,0.45-0.145,0.709v8.474c22.329-11.687,47.676-18.397,74.579-18.397 c26.922,0,52.252,6.711,74.597,18.414v-4.751l88.192-183.642C410.887,18.461,410.549,12.473,407.548,7.689z"/>
                    <path id="XMLID_442_" d="M245.658,218.186c-75.559,0-136.8,61.24-136.8,136.799c0,75.543,61.241,136.783,136.8,136.783 c75.543,0,136.785-61.24,136.785-136.783C382.444,279.426,321.201,218.186,245.658,218.186z M326.966,331.1l-36.52,35.62 c-1.14,1.122-1.671,2.729-1.397,4.302l8.622,50.293c0.303,1.813-0.452,3.659-1.944,4.75c-1.492,1.092-3.483,1.221-5.105,0.369 l-45.17-23.738c-1.412-0.742-3.115-0.742-4.529,0l-45.17,23.738c-1.622,0.852-3.613,0.723-5.105-0.369 c-1.492-1.091-2.246-2.938-1.941-4.75l8.621-50.293c0.271-1.572-0.259-3.18-1.397-4.302l-36.52-35.62 c-1.331-1.302-1.797-3.227-1.236-4.977c0.58-1.768,2.104-3.05,3.918-3.307l50.516-7.337c1.574-0.225,2.939-1.219,3.645-2.664 l22.587-45.749c0.819-1.654,2.505-2.715,4.35-2.715c1.846,0,3.529,1.061,4.349,2.715l22.587,45.749 c0.705,1.445,2.069,2.439,3.645,2.664l50.516,7.337c1.813,0.257,3.34,1.539,3.918,3.307 C328.764,327.873,328.296,329.798,326.966,331.1z"/>
                  </g>
                </svg>
              {/if}
              <p class="w-fit">
                0x<span class="uppercase">{(index % 16).toString(16)}</span>
              </p>
              {#if index % 16 === 0 || index % 16 === 1  || index % 16 === 2}
                <svg class="w-3.5 h-3.5 self-center {index % 16 === 0 ? 'fill-[#EFBF04]' : index % 16 === 1 ? 'fill-[#C0C0C0]' : 'fill-[#CD7F32]'}" viewBox="0 0 491.768 491.768" xml:space="preserve">
                  <g id="XMLID_439_">
                    <path id="XMLID_440_" d="M174.048,136.543l39.925-83.12l18.234-37.966l-2.938-6.131C226.54,3.628,220.778,0,214.453,0H98.137 c-5.651,0-10.899,2.906-13.918,7.689c-3.001,4.783-3.338,10.772-0.898,15.859l72.508,150.957L174.048,136.543z"/>
                    <path id="XMLID_441_" d="M407.548,7.689C404.53,2.906,399.281,0,393.63,0h-116.3c-6.323,0-12.088,3.628-14.815,9.326 l-89.814,187.012c-0.065,0.145-0.081,0.289-0.146,0.433c-0.143,0.322-0.209,0.675-0.337,1.013 c-0.577,1.559-0.913,3.211-0.994,4.959c-0.017,0.242-0.145,0.45-0.145,0.709v8.474c22.329-11.687,47.676-18.397,74.579-18.397 c26.922,0,52.252,6.711,74.597,18.414v-4.751l88.192-183.642C410.887,18.461,410.549,12.473,407.548,7.689z"/>
                    <path id="XMLID_442_" d="M245.658,218.186c-75.559,0-136.8,61.24-136.8,136.799c0,75.543,61.241,136.783,136.8,136.783 c75.543,0,136.785-61.24,136.785-136.783C382.444,279.426,321.201,218.186,245.658,218.186z M326.966,331.1l-36.52,35.62 c-1.14,1.122-1.671,2.729-1.397,4.302l8.622,50.293c0.303,1.813-0.452,3.659-1.944,4.75c-1.492,1.092-3.483,1.221-5.105,0.369 l-45.17-23.738c-1.412-0.742-3.115-0.742-4.529,0l-45.17,23.738c-1.622,0.852-3.613,0.723-5.105-0.369 c-1.492-1.091-2.246-2.938-1.941-4.75l8.621-50.293c0.271-1.572-0.259-3.18-1.397-4.302l-36.52-35.62 c-1.331-1.302-1.797-3.227-1.236-4.977c0.58-1.768,2.104-3.05,3.918-3.307l50.516-7.337c1.574-0.225,2.939-1.219,3.645-2.664 l22.587-45.749c0.819-1.654,2.505-2.715,4.35-2.715c1.846,0,3.529,1.061,4.349,2.715l22.587,45.749 c0.705,1.445,2.069,2.439,3.645,2.664l50.516,7.337c1.813,0.257,3.34,1.539,3.918,3.307 C328.764,327.873,328.296,329.798,326.966,331.1z"/>
                  </g>
                </svg>
              {/if}
            </div>
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
    from { transform: translateX(-50.3%); }
    to{ transform: translateX(0); }
  }
</style>
