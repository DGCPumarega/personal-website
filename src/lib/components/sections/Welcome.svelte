<script lang="ts">
  let {class: className}: {class?: string} = $props();
</script>

<section class="{className} font-oxanium">
  <h2 class="text-lg sm:text-3xl text-center uppercase font-bold">Welcome</h2>
  <div class="flex flex-col gap-y-4 leading-5">
    <p>
      ...to my corner of the internet!
    </p>
    <p>
      I'm a programmer (and serial procrastinator) currently living in <span class="font-bold text-red-300">Calgary, AB</span>. 
      I studied <span class="font-bold text-red-300">Software Development</span> at the <span class="font-bold text-red-300">Northern Alberta Institute of Technology (NAIT)</span> in Edmonton, and now I'm using what I've learned to make stuff on the internet. 
    </p>
    <p>
      I was inspired to create my own personal site after coming across some awesome, 2000s-style pages while exploring the indie web. 
      I was pretty sad to see that all that creativity and personality had gotten tucked away into some niche corner of the web... replaced by boring, cookie-cutter WordPress sites.
    </p>
    <p>
      I'm trying to make this site with more modern dev tools and design practices, but hopefully I'll be able to capture that indie web vibe!
    </p>
  </div>
</section>
