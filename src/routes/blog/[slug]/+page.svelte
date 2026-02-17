<script lang="ts">
  import type { PageProps } from "./$types";
  import { Separator } from "$lib/components/ui/separator";

  let { data }: PageProps = $props();
</script>

<article class="mx-4 lg:w-250 sm:mx-auto">
  <h2 class="font-bold text-3xl uppercase font-oxanium leading-5 mt-4">{data.meta.title}</h2>
  <p class="italic font-oxanium">{data.meta.date}</p>

  <Separator class="my-4"/>

  <div class="flex flex-col gap-y-4">
    <data.content />
  </div>
</article>
