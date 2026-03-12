<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Textarea } from "$lib/components/ui/textarea";
  import { 
    type SuperValidated,
    type Infer,
    superForm
  } from "sveltekit-superforms";
  import { zod4Client } from "sveltekit-superforms/adapters";
  import { messageFormSchema, type MessageFormSchema } from "$lib/components/home-sections/GuestbookSchema";

  let {
    class: className,
    messageFormProp
  }: { 
    class?: string,
    messageFormProp: SuperValidated<Infer<MessageFormSchema>>
  } = $props();

  const form = superForm(messageFormProp, {
    validators: zod4Client(messageFormSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form class={className} method="POST" action="?/message" use:enhance>
  <div class="flex flex-col sm:flex-row gap-2 w-full">
    <Form.Field {form} name="username" class="w-full">
      <Form.Control>
        {#snippet children({ props }: any)}
          <div class="flex flex-col gap-y-2 w-full">
            <Form.Label class="block leading-3">
              Username
            </Form.Label>
            <Input {...props} class="block bg-neutral-800 selection:bg-white selection:text-black" bind:value={$formData.username} />
          </div>
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="website" class="w-full">
      <Form.Control>
        {#snippet children({ props }: any)}
          <div class="flex flex-col gap-y-1 w-full">
            <Form.Label class="block">
              Website <span class="text-xs text-neutral-300 italic">(optional)</span>
            </Form.Label>
            <Input {...props} class="block bg-neutral-800 selection:bg-white selection:text-black" bind:value={$formData.website} />
          </div>
        {/snippet}
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
  </div>

  <Form.Field {form} name="content">
    <Form.Control>
      {#snippet children({ props }: any)}
        <div class="flex flex-col gap-y-1 mt-4">
          <Form.Label>Message</Form.Label>
          <Textarea {...props} class="bg-neutral-800 selection:bg-white selection:text-black" bind:value={$formData.content} />
        </div>
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button class="mt-3 hover:bg-yellow-200 hover:text-black">Submit</Form.Button>
</form>
