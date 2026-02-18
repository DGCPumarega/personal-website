<script lang="ts">
  import type { PageProps } from "./$types";
  import { Separator } from "$lib/components/ui/separator";
  import BlogSidebar from "$lib/components/blog/BlogSidebar.svelte";

  let { data }: PageProps = $props();
</script>

<div class="grid grid-cols-12 gap-x-2 min-h-[85vh] mx-4 sm:mx-auto lg:w-250">
  <BlogSidebar class="col-span-3" posts={data.posts} slug={data.slug} />

  <article class="col-span-9 font-oxanium px-8!">
    <h2 class="font-bold text-3xl uppercase leading-5 mt-4">{data.meta.title}</h2>
    <p class="italic">{data.meta.date}</p>
    <Separator class="my-6"/>
    <div class="flex flex-col gap-y-5">
      <data.content />
    </div>
  </article>
</div>
