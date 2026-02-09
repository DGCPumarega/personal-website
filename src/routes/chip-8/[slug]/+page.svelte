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

	const handleKeyDown = (event: KeyboardEvent) => {
		switch(event.code) {
			case "Digit1": vm.keypad = 0x1; break;
			case "Digit2": vm.keypad = 0x2; break;
			case "Digit3": vm.keypad = 0x3; break;
			case "Digit4": vm.keypad = 0xC; break;
			case "KeyQ": vm.keypad = 0x4; break;
			case "KeyW": vm.keypad = 0x5; break;
			case "KeyE": vm.keypad = 0x6; break;
			case "KeyR": vm.keypad = 0xD; break;
			case "KeyA": vm.keypad = 0x7; break;
			case "KeyS": vm.keypad = 0x8; break;
			case "KeyD": vm.keypad = 0x9; break;
			case "KeyF": vm.keypad = 0xE; break;
			case "KeyZ": vm.keypad = 0xA; break;
			case "KeyX": vm.keypad = 0x0; break;
			case "KeyC": vm.keypad = 0xB; break;
			case "KeyV": vm.keypad = 0xF; break;
			default: vm.keypad = null; break;
		}
	}
	const handleKeyUp = () => { vm.keypad = null; }

	let { data }: PageProps = $props();
</script>

<section class="lg:w-250 mx-auto">
	<h2>{data.title}</h2>
	<Display pixels={vm.display} />
</section>

<svelte:window
	on:keydown|preventDefault={handleKeyDown}
	on:keyup|preventDefault={handleKeyUp}
/>