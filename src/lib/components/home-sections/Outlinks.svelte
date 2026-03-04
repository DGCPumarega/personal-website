<script lang="ts">
  import NeocitiesButton from "$lib/assets/neocities-button.gif";

  let {class: className}: {class?: string} = $props();
</script>

<section class="{className} font-oxanium flex flex-col justify-between gap-y-4">
  <div>
    <h2 class="text-lg sm:text-3xl text-center uppercase font-bold">HREFS</h2>
    <p class="text-sm italic text-center leading-1 mb-3">explore the web!</p>
  </div>
  <div class="w-full flex justify-center gap-1 flex-wrap">
    <a class="w-22 h-7.75 overflow-clip" href="https://nekoweb.org/explore?page=1&sort=follows&by=name" target="_blank">
      <img src="https://nekoweb.org/assets/buttons/button11.gif" alt="Nekoweb">
      <!-- button by milkyway.moe -->
    </a>
    <a class="w-22 h-7.75 overflow-clip" href="https://status.cafe" target="_blank">
      <img src="https://status.cafe/assets/button.png" alt="Status Cafe"/>
    </a>
    <a class="w-22 h-7.75" href="https://neocities.org/browse" target="_blank">
      <img src={NeocitiesButton} alt="Neocities" />
    </a>
  </div>
  <div class="w-full flex justify-center align-middle">
    <a href="https://gossipsweb.net/personal-websites" target="_blank">
      <img src="https://gossipsweb.net/images/twwmwh-blue.jpg" alt="This website was made with hands." style="height: 31px; border: 1px solid #000;" />
    </a>
  </div>
</section>