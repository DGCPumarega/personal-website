<script lang="ts">
  import type { Post } from "$lib/types";

  let {class: className, posts, slug}: {class?: string, posts: Post[], slug: string} = $props();
</script>

<section class="{className}">
  <h2 class="font-oxanium text-xl sm:text-3xl text-center uppercase font-bold mt-2 mb-3">All Posts</h2>
  <ul class="flex flex-col gap-y-8">
    {#each posts as post}
      <li class="flex gap-x-2 w-full {post.slug === slug ? 'text-yellow-200 font-semibold bg-neutral-900 rounded-md' : '' } p-2 pt-2.5">
        <span class="block leading-4 {post.slug === slug ? 'blink' : ''}">&#10095;</span>
        <a class="w-full" href="/blog/{post.slug}">
          <span class="block text-lg leading-4">{post.title}</span>
          <span class="block text-xs italic lowercase">{post.description}</span>
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
  li .blink {
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