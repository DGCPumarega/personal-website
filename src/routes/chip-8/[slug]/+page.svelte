<script lang="ts">
	import type { PageProps } from "./$types";
	import { onMount } from "svelte";
	import { type VirtualMachine, createVM, loadFontSet, loadRom, fetchDecodeExecute } from "$lib/components/chip-8/Emulator";
	import { FONT_SET } from "$lib/components/chip-8/FontSet";
	import Display from "$lib/components/chip-8/Display.svelte";

	let vm: VirtualMachine = $state(createVM());

	onMount(() => {
		loadFontSet(vm, FONT_SET);
		loadRom(vm, data.bytes);

		if(data.title === "Keypad") { vm.memory[0x1FF] = 2; }

		// TODO: set up more accurate clock
		// TODO: allow user to configure frame rate
		setInterval(() => { fetchDecodeExecute(vm); }, 17);
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		switch(event.code) {
			case "Digit1": vm.keypad[0x1] = true; break;
			case "Digit2": vm.keypad[0x2] = true; break;
			case "Digit3": vm.keypad[0x3] = true; break;
			case "Digit4": vm.keypad[0xC] = true; break;
			case "KeyQ": vm.keypad[0x4] = true; break;
			case "KeyW": vm.keypad[0x5] = true; break;
			case "KeyE": vm.keypad[0x6] = true; break;
			case "KeyR": vm.keypad[0xD] = true; break;
			case "KeyA": vm.keypad[0x7] = true; break;
			case "KeyS": vm.keypad[0x8] = true; break;
			case "KeyD": vm.keypad[0x9] = true; break;
			case "KeyF": vm.keypad[0xE] = true; break;
			case "KeyZ": vm.keypad[0xA] = true; break;
			case "KeyX": vm.keypad[0x0] = true; break;
			case "KeyC": vm.keypad[0xB] = true; break;
			case "KeyV": vm.keypad[0xF] = true; break;
			default: break;
		}
	};

	const handleKeyUp = (event: KeyboardEvent) => { 
		switch(event.code) {
			case "Digit1": vm.keypad[0x1] = false; break;
			case "Digit2": vm.keypad[0x2] = false; break;
			case "Digit3": vm.keypad[0x3] = false; break;
			case "Digit4": vm.keypad[0xC] = false; break;
			case "KeyQ": vm.keypad[0x4] = false; break;
			case "KeyW": vm.keypad[0x5] = false; break;
			case "KeyE": vm.keypad[0x6] = false; break;
			case "KeyR": vm.keypad[0xD] = false; break;
			case "KeyA": vm.keypad[0x7] = false; break;
			case "KeyS": vm.keypad[0x8] = false; break;
			case "KeyD": vm.keypad[0x9] = false; break;
			case "KeyF": vm.keypad[0xE] = false; break;
			case "KeyZ": vm.keypad[0xA] = false; break;
			case "KeyX": vm.keypad[0x0] = false; break;
			case "KeyC": vm.keypad[0xB] = false; break;
			case "KeyV": vm.keypad[0xF] = false; break;
			default: break;
		}
	}

	let { data }: PageProps = $props();
</script>

<section id="display-container" class="w-fit mx-auto">
	<h2 class="font-oxanium font-bold text-center uppercase text-4xl bg-transparent mb-2">Now Playing: {data.title}</h2>
	<Display pixels={vm.display} />
</section>

<svelte:window
	on:keydown|preventDefault={handleKeyDown}
	on:keyup|preventDefault={handleKeyUp}
/>

<!--
<svelte:window
	on:keydown|preventDefault={handleKeyDown}
	on:keyup|preventDefault={handleKeyUp}
/>
-->

<style>
	#display-container {
		opacity: 100;
		margin-top: 1.5rem;
		border: 0;
		padding: 0;
		background-color: transparent;
	}
</style>