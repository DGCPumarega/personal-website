<script lang="ts">
  import type { GuestbookMessage } from "$lib/types";
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";
  import { formatDate } from "$lib/utils";

  let { class: className, messages }: { class?: string, messages: GuestbookMessage[] } = $props();

  type RepliableMessage = GuestbookMessage & { toggleReply: boolean };
  let repliableMessages: RepliableMessage[] = $state([]);

  onMount(() => {
    messages.forEach(message => {
      repliableMessages.push({...message, toggleReply: false})
    });
  });
</script>

<div class="{className} font-oxanium">
  <ul class="flex flex-col gap-y-6 h-full overflow-y-auto scrollable pb-5">
    {#each repliableMessages as message}
      <li class="px-2 py-3 bg-neutral-800 rounded-sm pb-0">
        <div class="mb-1 pb-1 leading-5 border-b border-b-yellow-200">
          <div class="flex flex-col mb-1 sm:mb-0 sm:flex-row gap-x-1">
            <p class="font-semibold">{message.username}</p>
            {#if message.website}
              <a class="text-sm" href={message.website} target="_blank">
                @ <span class="text-blue-400 underline underline-offset-2 italic">{message.website}</span> 
              </a>
            {/if}
          </div>
          <p class="text-xs uppercase italic">{formatDate(message.createdAt, "short")}</p>
        </div>
        <p class="leading-5 text-sm py-2">{message.content}</p>

        {#if message.replies && message.replies.length > 0}
          <div class="flex flex-col gap-y-2 my-2">
            {#each message.replies as reply}
              <div class="bg-neutral-600 p-2 rounded-sm border border-white">
                <div class="leading-4 mb-2">
                  <p class="font-semibold">{reply.username}</p>
                  <p class="italic text-xs">{formatDate(reply.createdAt, "short")}</p>
                </div>
                <p class="leading-5 text-sm">{reply.content}</p>
              </div>
            {/each}
          </div>
        {/if}

        {#if message.toggleReply}
          <form>
            <Input />
            <Textarea />
          </form>
        {/if}

        <div class="w-full flex justify-end text-xs pr-2">
          <Button
            class="text-xs underline underline-offset-2 text-white p-0 hover:text-yellow-200 hover:cursor-pointer"
            variant="link"
            onclick={() => message.toggleReply = !message.toggleReply}
          >
            reply
          </Button>
        </div>
      </li>
    {/each}
  </ul>
</div>
