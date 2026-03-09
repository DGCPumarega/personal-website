<script lang="ts">
  import { onMount } from "svelte";
  
  let { class: className, status }: { class?: string, status: any } = $props();

  type Status = {
    author: string;
    content: string;
    face: string;
    timeAgo: string;
  };

  let currentStatus: Status | null = $state(null);
  onMount(() => {
    if(status.author && status.content && status.face && status.timeAgo) {
      let tmp = document.createElement("textarea");
      tmp.innerHTML = status.content;

      currentStatus = {
        author: status.author as string,
        content: tmp.value as string,
        face: status.face as string,
        timeAgo: status.timeAgo as string
      } as Status;
    }
  });
</script>

<section class="{className} font-oxanium">
  <div>
    <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Latest Status</h2>
    <p class="text-sm italic text-center leading-3">
      bullsh*t I've posted on 
      <a class="underline underline-offset-2 text-blue-400" href="https://status.cafe/" target="_blank">
        status.cafe
      </a>
    </p>
  </div>
  {#if currentStatus}
    <div class="w-[90%] mx-auto my-10 sm:text-lg">
      <div class="flex justify-between mb-1.5">
        <p class="font-semibold">{currentStatus.author} {currentStatus.face}</p>
        <p class="italic text-yellow-400">{currentStatus.timeAgo}</p>
      </div>
      <p class="font-light leading-5">{currentStatus.content}</p>
    </div>
  {/if}
</section>
