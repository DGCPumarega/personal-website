<script lang="ts">
  import type { Post } from "$lib/types";

  let {class: className, posts}: {class?: string, posts: Post[]} = $props();
</script>

<section class="{className} font-oxanium flex flex-col gap-y-2">
  <h2 class="text-xl sm:text-3xl text-center uppercase font-bold">Blog</h2>
  <ul class="flex flex-col gap-y-8">
    {#each posts as post}
      <li class="flex gap-x-2 w-full hover:text-yellow-200 hover:font-semibold hover:bg-neutral-900 rounded-md p-2 pt-2.5">
        <span class="block leading-4 blink">&#10095;</span>
        <a class="w-full" href="/blog/{post.slug}">
          <span class="block text-lg leading-4">{post.title}</span>
          <span class="block text-xs italic lowercase">{post.description}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  li:hover .blink {
    animation: blink-animation 1s infinite;
  }
  @keyframes blink-animation {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
