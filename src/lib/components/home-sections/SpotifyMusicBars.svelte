<script lang="ts">
  let { class: className, isPaused}: {class?: string, isPaused: boolean} = $props();
</script>

<div class="{className} relative">
  <div class="music-bar {isPaused ? 'inactive' : 'active'} absolute bottom-0.5 left-0"></div>
  <div class="music-bar {isPaused ? 'inactive' : 'active'} absolute bottom-0.5 left-2"></div>
  <div class="music-bar {isPaused ? 'inactive' : 'active'} absolute bottom-0.5 left-4"></div>
  <div class="music-bar {isPaused ? 'inactive' : 'active'} absolute bottom-0.5 left-6"></div>
  <div class="music-bar {isPaused ? 'inactive' : 'active'} absolute bottom-0.5 left-8"></div>
</div>

<style>
  .music-bar {
    width: 4px;
    height: 3px;
    border-radius: 4px;
  }

  .active {
    animation: active-bounce infinite alternate;
    background-color: oklch(79.2% 0.209 151.711);
  }

  .inactive {
    animation: inactive-bounce infinite alternate;
    background-color: oklch(70.4% 0.191 22.216);
  }

  @keyframes active-bounce {
    0% {
      opacity: .35;
      height: 3px; 
    }
    100% {
      opacity: 1;
      height: 20px;
    }
  }

  @keyframes inactive-bounce {
    0% {
      opacity: .35;
      height: 3px; 
    }
    100% {
      opacity: 0.4;
      height: 4px;
    }
  }

  .music-bar:nth-child(1)  { animation-duration: 474ms; }
  .music-bar:nth-child(2)  { animation-duration: 433ms; }
  .music-bar:nth-child(3)  { animation-duration: 407ms; }
  .music-bar:nth-child(4)  { animation-duration: 458ms; }
  .music-bar:nth-child(5)  { animation-duration: 400ms; }

</style>
