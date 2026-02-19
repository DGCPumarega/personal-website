<script lang="ts">
  let { class: className }: { class?: string } = $props();

  let placeholders: { name: string, message: string }[] = [
    { name: "rando", message: "cool site, bro" },
    { name: "hater", message: "i hate u and this website with the intensity of a thousand suns" },
    { name: "bee enthusiast", message: "this is good news. we can finally be bees. this isn't your world, but we can be bees. this is good news. you can be a bee. you'll live like a bee. a pet. a pet? a pet, mark. this is good news. you'll live for 30 years. this is insane!" },
    { name: "h4rdc0r3 s34l", message: "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo." },
  ];
</script>

<div class={className}>
  <ul class="flex flex-col gap-y-4 p-2 h-full overflow-y-scroll">
    {#each placeholders as entry}
      <li class="w-full flex justify-between">
        <p class="w-1/2">{entry.name}</p>
        <p class="w-1/2">{entry.message}</p>
      </li>
    {/each}
  </ul>
</div>
