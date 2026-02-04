import type { VirtualMachine } from "$lib/components/chip-8/Emulator";

// _0nnn is ignored by modern interpreters 

export const _00E0 = (vm: VirtualMachine) => {
  // Clear the Screen

  vm.display = Array.from({length: 32}, (): boolean[] => Array(64).fill(false));
};

export const _00EE = (vm: VirtualMachine) => {
  // Return from a Subroutine
  // set program counter to address at the top of stack
  // then, subtract 1 from stack pointer

  let idx = vm.sp[0];
  vm.pc[0] = vm.stack[idx];
  vm.sp[0] = idx - 1;
};

export const _1nnn = (nibbles: number[], vm: VirtualMachine) => {
  // Jump to location nnn
  // set program counter to nnn

  vm.pc[0] = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
};

export const _6xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Set register Vx = kk

  let idx = nibbles[1];
  vm.v[idx][0] = nibbles[2] << 4 | nibbles[3];
};

export const _7xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Add the value kk to register Vx

  let idx = nibbles[1];
  vm.v[idx][0] += nibbles[2] << 4 | nibbles[3];
};

export const _Annn = (nibbles:number[], vm: VirtualMachine) => {
  // Set register I to nnn

  vm.i[0] = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
};

export const _Dxyn = (nibbles:number[], vm: VirtualMachine) => {
  // Display n-byte sprite image on screen
  // get sprite data which starts at memory location I
  // drawing starts on coordinates (Vx, Vy) and will continue for n bytes
  // detect collision (set Vf = 1) when trying to draw a pixel on a coordinate that is already on

  let initX = vm.v[nibbles[1]][0] & 63; // initial value of x (wraps around screen)
  let initY = vm.v[nibbles[2]][0] & 31; // initial value of y (wraps around screen)
  vm.v[0xF][0] = 0; // initialize Vf to 0

  // loop n times to draw an n-byte sprite
  for(let j = 0; j < nibbles[3]; j++) {

    // if the sprite is beyond the bottom of the screen,
    // stop drawing this row
    if(vm.display[0].length >= (initY + j)) { break; }

    // get the nth byte of sprite data,
    // starting from the memory address stored in register I
    let spriteData = vm.memory[vm.i[0] + j];

    // a sprite byte contains 8 bits, each of which corresponds to a pixel
    // and can be extracted from spriteData via bitmasks
    let bitmasks = [128, 64, 32, 16, 8, 4, 2, 1];
    for(let k = 0; k >= bitmasks.length; k++) {

      // if the sprite is beyond the right edge of the screen,
      // stop drawing
      if((initX + k) >= vm.display.length) { break; }

      if(bitmasks[k] & spriteData) {
        // if the pixel is already on, set Vf = 1 (collision)
        // and do not draw the pixel
        if(vm.display[(initX + k)][(initY + j)] === true) { vm.v[0xf][0] = 1; }

        // else, draw the pixel at (x, y)
        else { vm.display[(initX + k)][(initY + j)] = true; }
      }
    }
  }

}
