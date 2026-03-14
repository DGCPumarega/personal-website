<script lang="ts">
  import { replyFormSchema, type ReplyFormSchema } from "$lib/components/home-sections/GuestbookSchema";
  import type { GuestbookMessage } from "$lib/types";
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
  import { Spinner } from "$lib/components/ui/spinner";
  import { formatDate } from "$lib/utils";
  import { invalidateAll } from "$app/navigation";

  let {
    class: className,
    messages,
    replyFormProp,
  }: {
    class?: string,
    messages: GuestbookMessage[] | null,
    replyFormProp: SuperValidated<Infer<ReplyFormSchema>>,
  } = $props();

  let isVisibleSpinner = $state(false);
  let isFlaggedAsBot = $state(false);
  let honeypot = $state("");

  const form = superForm(replyFormProp, {
    validators: zod4Client(replyFormSchema),
    onSubmit: ({ cancel }) => {
      isVisibleSpinner = true;
      if(honeypot) {
        cancel();
        isVisibleSpinner = false;
        isFlaggedAsBot = true;
      }
    },
    onUpdated: () => { isVisibleSpinner = false; },
  });

  const { form: formData, enhance, reset } = form;

  type RepliableMessage = GuestbookMessage & { toggleReply: boolean };
  let repliableMessages: RepliableMessage[] | null = $state(null);

  $effect(() => {
    if(messages) {
      repliableMessages = messages.map(message => {
        return({ ...message, toggleReply: false })
      });
    }
  });

  const handleToggleReply = (repliableMessage: RepliableMessage) => {
    if(repliableMessages) {
      repliableMessages.forEach(x => x.toggleReply = false);
      reset();
      repliableMessage.toggleReply = !repliableMessage.toggleReply;
    }
  };

  const handleReload = () => {
    console.log("triggered")
    invalidateAll();
  };
</script>

<div class="{className} font-oxanium">
  {#if messages}
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
              <input name="email" id="email" class="hny" autocomplete="off" aria-hidden="true" bind:value={honeypot} />

              <div class="flex flex-col gap-y-1 bg-neutral-600 border border-white mt-4 rounded-sm p-4 font-sans">
                <input class="hidden" name="messageId" autocomplete="off" aria-hidden="true" value={message.id} />

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

                <div class="flex gap-x-1 w-full justify-between">
                  <Spinner class="size-7 self-center ml-1 text-yellow-200 {isVisibleSpinner ? "block" : "invisible"}" /> 
                  <p class="text-red-400 {isFlaggedAsBot ? "block" : "hidden"}">
                    Unable to Send Message: Flagged as Bot
                  </p>
                  <div>
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
    {:else}
      <div class="flex flex-col h-full justify-center">
        <p class="text-lg uppercase sm:text-xl font-bold text-center">Unable to Load Messages :(</p>
        <Button
          variant="link"
          class="text-white underline py-0! hover:cursor-pointer hover:font-semibold hover:text-yellow-400"
          onclick={() => handleReload()}
        >
          Click Here to Retry
        </Button>
      </div>
  {/if}
</div>

<style>
  .hny {
    display: none;
  }
</style>
