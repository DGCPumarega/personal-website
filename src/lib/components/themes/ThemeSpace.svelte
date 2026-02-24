<script lang="ts">
  type Star = {
    x: number;
    y: number;
    size: number;
    isStatic: boolean;
  };

  type Comet = {
    x: number;
    y: number;
    fallDuration: number;
    height: number;
  };
  
  const NUM_STARS = 200;
  let stars: Star[] = Array.from({length: NUM_STARS}, (): Star => {
    return {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random(), 
      isStatic: Math.random() > 0.4,
    };
  });

  const NUM_COMETS = 7;
  const comets: Comet[] = $state([]);
  let delay = 10000;
  let id = setInterval(() => {
    comets.push({
      x: (Math.random() * 100),
      y: (Math.random() * 100),
      fallDuration: 3 + (Math.random() * 7),
      height: (Math.random() * 100)
    });

    if(comets.length > NUM_COMETS - 1) { clearInterval(id); }
    else { delay = Math.random() * 10000; }
  }, delay)

	let { children } = $props();
</script>

<div class="relative space-background min-h-screen max-w-screen overflow-hidden">
  <div class="absolute inset-0 pointer-events-none">
    {#each stars as star}
      <div
        class={star.isStatic ? "star" : "star active"} 
        style="left:{star.x}%; top:{star.y}%; width:{star.size}px; height:{star.size}px"
      ></div>
    {/each}
    <div class="w-[90vw] h-[150vh] bg-transparent rotate-135 relative left-40">
      {#each comets as comet}
        <div
          class="comet"
          style="left:{comet.x}%; top:{comet.y}%; animation-duration:{comet.fallDuration}s; height:{comet.height}%;"
        ></div>
      {/each}
    </div>
  </div>
  <div class="relative bg-transparent">
    {@render children()}
  </div>
</div>

<style>
  .space-background {
    background: radial-gradient(1200px 800px at 80% 10%, rgba(124, 58, 237, .25), transparent 60%), 
                radial-gradient(1000px 700px at 10% 90%, rgba(6, 182, 212, .22), transparent 55%),
                #0b0f14;
  }
  .star {
    position: absolute;
    background: white;
    border: white;
    border-radius: 50%;
    opacity: 0.8;
    width: 1.5px;
    height: 1.5px;
  }
  .active {
    animation: twinkle 2s infinite ease-in-out;
  }
  .active:nth-child(2n+1) {
    animation-delay: 3s;
    animation-duration: 3s;
  }
  .active:nth-child(3n+1) {
    animation-delay: 1s;
  }
  @keyframes twinkle {
    0%,
    100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.2);
    }
  }

  .comet {
    position: absolute;
    background: linear-gradient(#fff, transparent);
    animation-name: comet-fall;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    width: 3px;
  }
  @keyframes comet-fall {
    0% {
      opacity: 0;
      transform: translateY(200%) scaleY(0);
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: translateY(0) scaleY(1);
    }
  }

  :global(main div section, main section, main article) {
    background-color: black;
    opacity: 0.60;
    border: 2px solid white;
    border-radius: 2px;
    backdrop-filter: blur(12px);
    color: white;
    padding: 8px;
  }
  :global(.scrollable::-webkit-scrollbar) {
    width: 4px;
    background-color: transparent;
  }
  :global(.scrollable::-webkit-scrollbar-thumb) {
    background-color: oklch(87% 0 0);
    border-radius: 8px;
  }
</style>
