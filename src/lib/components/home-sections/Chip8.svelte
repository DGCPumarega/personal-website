<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { Button } from "$lib/components/ui/button";

  let value = $state("");

  // value of AvailableROM object must match the
  // id of the ValidROM object defined in /chip-8/[slug]/+page.server.ts
  type AvailableROM = { value: string; label: string; }
  let availableRoms: AvailableROM[] = [
    { value: "ibm-logo", label: "IBM Logo" },
    { value: "corax-plus", label: "Corax+" },
    { value: "flags", label: "Flags" },
    { value: "keypad", label: "Keypad" },
  ];

  let triggerContent = $derived(
    availableRoms.find((f) => f.value === value)?.label ?? "Select a ROM"
  );

  let {class: className}: {class?: string} = $props();
</script>

<section class="{className}">
  <h2 class="text-xl sm:text-3xl text-center uppercase font-bold font-oxanium mb-3 leading-7">CHIP-8 Emulator</h2>
  <div class="w-fit mx-auto mb-3">
    <Select.Root type="single" bind:value>
      <Select.Trigger class="">{triggerContent}</Select.Trigger>
      <Select.Content>
        {#each availableRoms as rom}
          <Select.Item
            value={rom.value}
            label={rom.label}
          >
            {rom.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
  <div class="w-fit mx-auto flex gap-x-2">
    <Button class="uppercase font-oxanium" href="/chip-8/{value}">
      Play
    </Button>
    <Button class="uppercase font-oxanium">
      Info
    </Button>
  </div>
</section>