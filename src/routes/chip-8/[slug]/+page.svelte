<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<section>
  <h2>{data.title}</h2>
</section>