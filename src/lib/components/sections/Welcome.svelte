<script lang="ts">
  import CatBoxIdle from "$lib/animated-sprites/CatBoxIdle.svelte";
  let {class: className}: {class?: string} = $props();
</script>

<section class="{className} font-oxanium">
  <div class="flex gap-x-2 align-middle justify-center">
    <h2 class="text-3xl text-center uppercase font-bold">Welcome</h2>
    <!--
      TODO: Replace Threlte with CSS for animated sprites 
      <CatBoxIdle />
    -->
  </div>
  <div class="flex flex-col gap-y-4 leading-5">
    <p>
      ...to my corner of the internet!
    </p>
    <p>
      I'm a programmer (and chronic procrastinator) currently living in <span class="font-bold text-red-300">Calgary, AB</span>. 
      I studied <span class="font-bold text-red-300">Software Development</span> at the <span class="font-bold text-red-300">Northern Alberta Institute of Technology (NAIT)</span> in Edmonton, and now I'm using what I've learned to make stuff on the internet. 
    </p>
    <p>
      I was inspired to create my own personal site after coming across some awesome, 2000s-style pages on the indie web. 
      I'm using more modern dev tools and design practices for this project, but hopefully, I'll be able to capture a bit of that indie web vibe!
    </p>
    <p>
      Enjoy your stay!
    </p>
  </div>
</section>
