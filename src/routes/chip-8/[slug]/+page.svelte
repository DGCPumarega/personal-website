<script lang="ts">
	import type { PageProps } from "./$types";
	import { onMount } from "svelte";
	import { type VirtualMachine, createVM, loadFontSet, loadRom, runLoop } from "$lib/components/chip-8/Emulator";
	import { FONT_SET } from "$lib/components/chip-8/FontSet";
	import Display from "$lib/components/chip-8/Display.svelte";

	let vm: VirtualMachine = $state(createVM());

	onMount(() => {
		loadFontSet(vm, FONT_SET);
		loadRom(vm, data.bytes);

		// TODO: set up more accurate clock
		setInterval(() => { 
			runLoop(vm); 
		}, 1000);
	});


	let { data }: PageProps = $props();
</script>

<section class="lg:w-250 mx-auto">
	<h2>{data.title}</h2>
	<Display pixels={vm.display} />
</section>