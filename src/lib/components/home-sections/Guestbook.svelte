<script lang="ts">
  import type { SuperValidated, Infer } from "sveltekit-superforms";
  import type { GuestbookMessage } from "$lib/types";
  import type { MessageFormSchema, ReplyFormSchema } from "$lib/components/home-sections/GuestbookSchema";
  import GuestbookMessages from "$lib/components/home-sections/GuestbookMessages.svelte";
  import GuestbookForm from "$lib/components/home-sections/GuestbookForm.svelte";

  let {
    class: className,
    messages,
    messageFormProp,
    replyFormProp,
  }: { 
    class?: string,
    messages: GuestbookMessage[],
    messageFormProp: SuperValidated<Infer<MessageFormSchema>>,
    replyFormProp: SuperValidated<Infer<ReplyFormSchema>>,
  } = $props();
</script>

<section id="guestbook" class="{className} flex flex-col gap-y-4 justify-between">
  <div class="mb-4 lg:mb-0">
    <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Guestbook</h2>
    <p class="text-sm italic text-center leading-3">leave a message 
      <span class="text-neutral-400">(if u wanna)</span>!
    </p>
  </div>
  <GuestbookMessages class="border border-white rounded-sm h-125 lg:h-113" messages={messages} replyFormProp={replyFormProp} />
  <GuestbookForm class="mb-4" messageFormProp={messageFormProp} />
</section>
