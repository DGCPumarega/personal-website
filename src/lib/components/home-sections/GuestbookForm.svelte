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
  import { formSchema, type FormSchema } from "$lib/components/home-sections/GuestbookSchema";

  let {
    class: className,
    formProp
  }: { 
    class?: string,
    formProp: SuperValidated<Infer<FormSchema>>
  } = $props();

  const form = superForm(formProp, {
    validators: zod4Client(formSchema)
  });

  const { form: formData, enhance } = form;
</script>

<form class={className} method="POST" use:enhance>
  <Form.Field {form} name="username">
    <div class="flex gap-x-2 w-full">
      <Form.Control>
        <div class="flex flex-col gap-y-2 w-full">
          <Form.Label class="block leading-3">
            Username
          </Form.Label>
          <Input class="block bg-neutral-800" bind:value={$formData.username} />
        </div>
      </Form.Control>
      <Form.Control>
        <div class="flex flex-col gap-y-1 w-full">
          <Form.Label class="block">
            Email <span class="text-xs text-neutral-300 italic">(optional)</span>
          </Form.Label>
          <Input class="block bg-neutral-800" bind:value={$formData.email} />
        </div>
      </Form.Control>
    </div>
    <Form.Control>
      <Form.Label>Message</Form.Label>
      <Textarea class="bg-neutral-800" bind:value={$formData.message} />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
