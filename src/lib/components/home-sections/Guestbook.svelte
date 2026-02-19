<script lang="ts">
  import type { SuperValidated, Infer } from "sveltekit-superforms";
  import type { FormSchema } from "$lib/components/home-sections/GuestbookSchema";
  import GuestbookMessages from "$lib/components/home-sections/GuestbookMessages.svelte";
  import GuestbookForm from "$lib/components/home-sections/GuestbookForm.svelte";

  let {
    class: className,
    formProp
  }: { 
    class?: string,
    formProp: SuperValidated<Infer<FormSchema>>
  } = $props();
</script>

<section id="guestbook" class="{className} flex flex-col gap-y-4 sm:justify-between">
  <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Guestbook</h2>
  <GuestbookMessages class="border border-white rounded-sm h-96" />
  <GuestbookForm class="mb-4" formProp={formProp} />
</section>
