<script lang="ts">
  let {class: className}: {class?: string} = $props();
</script>

<section class="{className} font-oxanium max-h-[70vh] scrollable overflow-y-auto">
  <div class="flex gap-x-2 align-middle justify-center mb-4">
    <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Welcome</h2>
  </div>
  <div class="flex flex-col gap-y-4 leading-5">
    <p>...to one of <span class="font-bold italic">the</span> websites of all time.</p>
    <p>
      I'm a (somewhat new) programmer currently living in <span class="font-bold text-red-300">Calgary, AB</span>. 
      I studied <span class="font-bold text-red-300">Software Development</span> at the <span class="font-bold text-red-300">Northern Alberta Institute of Technology (NAIT)</span> in Edmonton, and now I'm using what I've learned to make stuff on the internet! 
    </p>
    <p>
      I was inspired to start this project after coming across a couple of personal websites hosted on 
      <a class="text-blue-200 underline underline-offset-2" href="https://neocities.org/" target="_blank">Neocities</a> 
      and 
      <a class="text-blue-200 underline underline-offset-2" href="https://nekoweb.org/" target="_blank">Nekoweb</a>. 
      These sites were my introduction to the indie web, and they reminded me that the internet wasn't always about things like 
      <span class="italic font-light">"maximizing user engagement"</span> or 
      <span class="italic font-light">"increasing ad revenue"</span>.
      Back then, websites were a way for people to express themselves creatively and freely. 
    </p>
    <p>
      So
      <span class="text-yellow-300">I made my own personal website 'cause I think it's important to remember the ethos of the old-school of the internet</span> 
      and keep it alive. 
      Even if it's just in this small, niche corner of the world wide web.
    </p>
    <p>
      This place is <span class="text-yellow-300">still under construction</span>, so there isn't much to see yet...
      But I hope you have fun checking out the things I've made so far! And don't forget to leave a comment in the 
      <a class="text-blue-200 underline underline-offset-2" href="#guestbook">guestbook</a> 
      before you go! I'm always open to suggestions (or constructive criticism lol)
    </p>
  </div>
</section>
