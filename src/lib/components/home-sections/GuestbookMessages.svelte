<script lang="ts">
  import type { GuestbookMessage } from "$lib/types";
  import { formatDate } from "$lib/utils";

  let { class: className, messages }: { class?: string, messages: GuestbookMessage[] } = $props();
</script>

<div class={className}>
  <ul class="flex flex-col gap-y-4 h-full overflow-y-scroll">
    {#each messages as message}
      <li class="p-2 pb-3">
        <div class="mb-1 pb-1 leading-4 border-b border-b-yellow-200">
          <p class="font-semibold">{message.username}</p>
          <p class="text-xs uppercase italic">{formatDate(message.createdAt, "short")}</p>
        </div>
        <p class="leading-5 text-sm">{message.content}</p>
      </li>
    {/each}
  </ul>
</div>
