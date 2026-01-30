<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import ThemeProvider from '$lib/components/themes/ThemeProvider.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">

	<link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<ThemeProvider>
	<header class="w-full h-20 flex flex-col justify-end text-white mx-4 mb-3 lg:mx-auto lg:w-250">
		<div class="relative w-min pl-1">
			<a href="/">
				<h1 class="uppercase text-xl sm:text-4xl font-press-start neon-text z-1" data-text="DGCPumarega.dev">DGCPumarega.dev</h1>
			</a>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
</ThemeProvider>

<style>
	.neon-text {
		position: relative;
		-webkit-text-stroke: 1px #bf4080;
	}
	.neon-text::before {
		content: attr(data-text);
		position: absolute;
		bottom: 3px;
		right: 3px;
		font-family: inherit;
		font-size: inherit;
		animation: animateTextColor 3s infinite linear;
		z-index: -1;
	}
	@keyframes animateTextColor {
		0% { color: #fe5f55; }
		20% { color: #bf4080; }
		50% { color: #00b4d8; }
		60% { color: #6f2ed8; }
		80% { color: #e6f14a; }
		100% { color: #fe5f55; }
	}
</style>
