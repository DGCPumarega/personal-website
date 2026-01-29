import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { read } from '$app/server';
import IbmLogo from "$lib/assets/roms/ibm_logo.ch8?url";

type ValidROM = { id: string; label: string; src: string; }
let validRoms: ValidROM[] = [
  { id: "ibm-logo", label: "IBM Logo", src: IbmLogo },
];

export const load: PageServerLoad = async ({ params }) => {
  let selectedRom = validRoms.find((f) => f.id === params.slug) ?? null;
  
  if (selectedRom) {
    let data = read(selectedRom.src);
    let buffer = await data.arrayBuffer();
    let bin = new Uint8Array(buffer);

    return { title: selectedRom.label, bytes: bin }
  }

	error(404, 'Unable to Find CHIP-8 ROM');
};
