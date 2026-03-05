<script lang="ts">
  import type { GuestbookMessage } from "$lib/types";
  import { formatDate } from "$lib/utils";

  let { class: className, messages }: { class?: string, messages: GuestbookMessage[] } = $props();
</script>

<div class="{className} font-oxanium">
  <ul class="flex flex-col gap-y-2 h-full overflow-y-auto scrollable pb-5">
    {#each messages as message}
      <li class="p-2">
        <div class="mb-1 pb-1 leading-4 border-b border-b-yellow-200">
          <div class="flex gap-x-1">
            <p class="font-semibold">{message.username}</p>
            {#if message.website}
              <a class="text-sm leading-4" href={message.website} target="_blank">
                @ <span class="text-blue-400 underline underline-offset-2 italic">{message.website}</span> 
              </a>
            {/if}
          </div>
          <p class="text-xs uppercase italic">{formatDate(message.createdAt, "short")}</p>
        </div>
        <p class="leading-5 text-sm">{message.content}</p>
      </li>
    {/each}
  </ul>
</div>
