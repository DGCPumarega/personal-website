<script lang="ts">
  import { onMount } from "svelte";
  import { error } from "@sveltejs/kit";

  let { pixels }: { pixels: boolean[][] } = $props();

  let canvas: HTMLCanvasElement | null = $state(null);
  let ctx: CanvasRenderingContext2D | null = $state(null);

  onMount(() => {
    canvas = document.getElementById("ch8-display") as HTMLCanvasElement;
    if(!canvas) { throw error(400, "Unable to load CHIP-8 display"); }

    ctx = canvas.getContext("2d");
    if(!ctx) { throw error(400, "Unable to get CHIP-8 display context"); }
  });

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let pxw = canvas.width / 64;
    let pxh  = canvas.height / 32;

    ctx.fillStyle = "white"
    pixels.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if(pixel) { ctx.fillRect(x*pxw, y*pxh, pxw, pxh); }
      });
    });
  };

  $effect(() => { 
    if(canvas && ctx) { draw(canvas, ctx); }
  });
</script>

<canvas
  id="ch8-display"
  bind:this={canvas}
  width="640"
  height="320"
></canvas>

<style>
  #ch8-display {
    width: calc(640px * 1.55);
    height: calc(320px * 1.55);
    image-rendering: pixelated;
  }
</style>