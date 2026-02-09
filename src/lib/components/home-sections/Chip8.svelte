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
  ];

  let triggerContent = $derived(
    availableRoms.find((f) => f.value === value)?.label ?? "Select a ROM"
  );
</script>

<section>
  <h2 class="text-3xl text-center uppercase font-bold font-oxanium">CHIP-8 Emulator</h2>
  <Select.Root type="single" bind:value>
    <Select.Trigger>{triggerContent}</Select.Trigger>
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
  <Button 
    class="uppercase font-oxanium"
    href="/chip-8/{value}"
  >
    Play
  </Button>
</section>