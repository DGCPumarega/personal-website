<script lang="ts">
  import type { GuestbookMessage } from "$lib/types";

  let { class: className, messages }: { class?: string, messages: GuestbookMessage[] } = $props();
</script>

<div class={className}>
  <ul class="flex flex-col gap-y-4 p-2 h-full overflow-y-scroll">
    {#each messages as message}
      <li class="w-full flex justify-between">
        <p class="w-1/2">{message.username}</p>
        <p class="w-1/2">{message.content}</p>
      </li>
    {/each}
  </ul>
</div>
