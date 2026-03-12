<script lang="ts">
  import { replyFormSchema, type ReplyFormSchema } from "$lib/components/home-sections/GuestbookSchema";
  import type { GuestbookMessage } from "$lib/types";
  import { onMount } from "svelte";
  import { 
    type SuperValidated,
    type Infer,
    superForm
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import * as Form from "$lib/components/ui/form";
  import { Button } from "$lib/components/ui/button";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Input } from "$lib/components/ui/input";
  import { formatDate } from "$lib/utils";
  import { invalidateAll } from "$app/navigation";

  let {
    class: className,
    messages,
    replyFormProp,
  }: {
    class?: string,
    messages: GuestbookMessage[],
    replyFormProp: SuperValidated<Infer<ReplyFormSchema>>,
  } = $props();

  const form = superForm(replyFormProp, {
    validators: zod4Client(replyFormSchema),
  });

  const { form: formData, enhance, reset } = form;

  type RepliableMessage = GuestbookMessage & { toggleReply: boolean };
  let repliableMessages: RepliableMessage[] = $state([]);

  onMount(() => {
    messages.forEach(message => {
      repliableMessages.push({...message, toggleReply: false})
    });
  });

  const handleToggleReply = (repliableMessage: RepliableMessage) => {
    repliableMessages.forEach(x => x.toggleReply = false);
    reset();
    repliableMessage.toggleReply = !repliableMessage.toggleReply;
  };
</script>

<div class="{className} font-oxanium">
  <ul class="flex flex-col gap-y-6 h-full overflow-y-auto scrollable pb-5">
    {#each repliableMessages as message}
      <li class="mx-1 px-2 py-3 bg-neutral-800 rounded-sm pb-0">
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
          <form method="POST" action="?/reply" use:enhance>
            <div class="flex flex-col gap-y-1 bg-neutral-600 border border-white mt-4 rounded-sm p-4 font-sans">
              <input class="hidden" name="messageId" value={message.id} />

              <Form.Field {form} name="username" class="w-full">
                <Form.Control>
                  {#snippet children({ props }: any)}
                    <div class="w-full">
                      <Form.Label class="block leading-3 text-sm">
                        Username
                      </Form.Label>
                      <Input {...props} class="block bg-neutral-800 selection:bg-white selection:text-black" bind:value={$formData.username} />
                    </div>
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <Form.Field {form} name="content">
                <Form.Control>
                  {#snippet children({ props }: any)}
                    <div>
                      <Form.Label class="leading-3 text-sm">Reply</Form.Label>
                      <Textarea {...props} class="bg-neutral-800 selection:bg-white selection:text-black" bind:value={$formData.content} />
                    </div>
                  {/snippet}
                </Form.Control>
                <Form.FieldErrors />
              </Form.Field>

              <div class="flex gap-x-1 w-full justify-end">
                <Form.Button
                  class="hover:bg-yellow-200 hover:text-black"
                >
                  Submit
                </Form.Button>
                <Button
                  class="hover:bg-yellow-200 hover:text-black"
                  onclick={() => message.toggleReply = false}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        {/if}

        <div class="w-full flex justify-end text-xs pr-2">
          <Button
            class="text-xs underline underline-offset-2 text-white p-0 hover:text-yellow-200 hover:cursor-pointer"
            variant="link"
            onclick={() => handleToggleReply(message)}
          >
            reply
          </Button>
        </div>
      </li>
    {/each}
  </ul>
</div>
