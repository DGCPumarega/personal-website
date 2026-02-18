<script lang="ts">
  import * as Form from "$lib/components/ui/form";

  let {class: className}: {class?: string} = $props();
</script>

<section id="guestbook" class="{className} font-oxanium flex flex-col gap-y-2">
  <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Leave a Message</h2>
  <div id="message-display" class="min-h-1/2"></div>
  <form>

  </form>
</section>
