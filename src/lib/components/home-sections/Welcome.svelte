<script lang="ts">
  let {class: className}: {class?: string} = $props();
</script>

<section class="{className} font-oxanium">
  <div class="flex gap-x-2 align-middle justify-center mb-4">
    <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Welcome</h2>
  </div>
  <div class="flex flex-col gap-y-4 leading-5">
    <p>...to one of <span class="font-bold">the</span> websites of all time.</p>
    <p>
      I'm a (somewhat new) programmer currently living in <span class="font-bold text-red-300">Calgary, AB</span>. 
      I studied <span class="font-bold text-red-300">Software Development</span> at the <span class="font-bold text-red-300">Northern Alberta Institute of Technology (NAIT)</span> in Edmonton, and now I'm using what I've learned to make stuff on the internet! 
    </p>
    <p>
      I was inspired to make my own website after coming across several 2000s-style pages hosted on places like 
      <a class="text-blue-200 underline underline-offset-2" href="https://neocities.org/" target="_blank">Neocities</a> 
      and 
      <a class="text-blue-200 underline underline-offset-2" href="https://nekoweb.org/" target="_blank">Nekoweb</a>. 
      It was great to see so many sites designed in such creative and personal ways! 
      They reminded me of how awesome the old internet used to be - back when people used to surf the web instead of visit the same old apps and social media pages.
    </p>
    <p>
      This place is <span class="text-yellow-300">still under construction</span>, but I hope you have fun exploring this website!
      And don't forget to leave a comment (or some constructive criticism) in the 
      <a class="text-blue-200 underline underline-offset-2" href="#guestbook">guestbook</a> 
      before you go!
    </p>
  </div>
</section>
