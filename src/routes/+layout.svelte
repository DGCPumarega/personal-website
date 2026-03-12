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

	<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<ThemeProvider>
	<header class="w-full h-15 sm:h-20 flex flex-col justify-end text-white mx-4 mb-3 lg:mx-auto lg:w-250">
		<div class="relative w-min pl-1">
			<a href="/">
				<h1 class="uppercase text-xl sm:text-4xl font-press-start neon-text z-1" data-text="DGCPumarega.dev">DGCPumarega.dev</h1>
			</a>
		</div>
	</header>
	<main>
		{@render children()}
	</main>
	<footer class="w-full h-20 mx-4 flex flex-col gap-y-2 justify-center lg:mx-auto lg:w-250 mt-3">
		<div class="flex gap-x-1 self-center">
			<p class="text-white font-oxanium h-fit self-center text-xl uppercase font-semibold">Powered by</p>
			<a href="https://svelte.dev/" target="_blank" aria-label="svelte">
				<svg class="h-10 glowing" viewBox="0 0 32 32">
					<path class="fill-[#ff3e00]" d="M26.47,5.7A8.973,8.973,0,0,0,14.677,3.246L7.96,7.4a7.461,7.461,0,0,0-3.481,5.009,7.686,7.686,0,0,0,.8,5.058,7.358,7.358,0,0,0-1.151,2.8,7.789,7.789,0,0,0,1.4,6.028,8.977,8.977,0,0,0,11.794,2.458L24.04,24.6a7.468,7.468,0,0,0,3.481-5.009,7.673,7.673,0,0,0-.8-5.062,7.348,7.348,0,0,0,1.152-2.8A7.785,7.785,0,0,0,26.47,5.7" />
					<path class="fill-white" d="M14.022,26.64A5.413,5.413,0,0,1,8.3,24.581a4.678,4.678,0,0,1-.848-3.625,4.307,4.307,0,0,1,.159-.61l.127-.375.344.238a8.76,8.76,0,0,0,2.628,1.274l.245.073-.025.237a1.441,1.441,0,0,0,.271.968,1.63,1.63,0,0,0,1.743.636,1.512,1.512,0,0,0,.411-.175l6.7-4.154a1.366,1.366,0,0,0,.633-.909,1.407,1.407,0,0,0-.244-1.091,1.634,1.634,0,0,0-1.726-.622,1.509,1.509,0,0,0-.413.176l-2.572,1.584a4.934,4.934,0,0,1-1.364.582,5.415,5.415,0,0,1-5.727-2.06A4.678,4.678,0,0,1,7.811,13.1,4.507,4.507,0,0,1,9.9,10.09l6.708-4.154a4.932,4.932,0,0,1,1.364-.581A5.413,5.413,0,0,1,23.7,7.414a4.679,4.679,0,0,1,.848,3.625,4.272,4.272,0,0,1-.159.61l-.127.375-.344-.237a8.713,8.713,0,0,0-2.628-1.274l-.245-.074.025-.237a1.438,1.438,0,0,0-.272-.968,1.629,1.629,0,0,0-1.725-.622,1.484,1.484,0,0,0-.411.176l-6.722,4.14a1.353,1.353,0,0,0-.631.908,1.394,1.394,0,0,0,.244,1.092,1.634,1.634,0,0,0,1.726.621,1.538,1.538,0,0,0,.413-.175l2.562-1.585a4.9,4.9,0,0,1,1.364-.581,5.417,5.417,0,0,1,5.728,2.059,4.681,4.681,0,0,1,.843,3.625A4.5,4.5,0,0,1,22.1,21.905l-6.707,4.154a4.9,4.9,0,0,1-1.364.581" />
				</svg>
			</a>
		</div>
		<div class="text-white font-oxanium flex gap-x-3 text-sm justify-center font-light">
			<p>DGCPumarega</p>
			<p class="text-yellow-200 font-bold">|</p>
			<p>2026</p>
		</div>
	</footer>
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
	.glowing {
		animation: glow 2s infinite alternate;
	}
	@keyframes glow {
		0% {
			opacity: 0.4;
		}
		100% {
			opacity: 1;
		}
	}

</style>
