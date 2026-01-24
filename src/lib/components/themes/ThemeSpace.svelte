<script lang="ts">
  type Star = {
    x: number;
    y: number;
    size: number;
    isStatic: boolean;
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

	let { children } = $props();
</script>

<div class="space-background relative -z-20 min-h-screen max-w-screen overflow-hidden">
  {#each stars as star}
    <div
      class={star.isStatic ? "star" : "star active"} 
      style="left:{star.x}%; top:{star.y}%; width:{star.size}px; height:{star.size}px">
    </div>
  {/each}
  <!--
    TODO: comets
    <div class="comets relative -z-10"></div>
  -->
  {@render children()}
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
  :global(main section) {
    background-color: black;
    opacity: 0.60;
    border: 2px solid white;
    border-radius: 2px;
    backdrop-filter: blur(12px);
    color: white;
    padding: 8px;
  }
</style>
