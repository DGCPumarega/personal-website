import type { VirtualMachine } from "$lib/components/chip-8/Emulator";

// _0nnn is ignored by modern interpreters 

export const _00E0 = (vm: VirtualMachine) => {
  // Clear the Screen
  console.log("...executing instruction 00E0");

  vm.display = Array.from({length: 32}, (): boolean[] => Array(64).fill(false));
};

export const _00EE = (vm: VirtualMachine) => {
  // Return from a Subroutine
  // set program counter to address at the top of stack
  // then, subtract 1 from stack pointer
  console.log("...executing instruction 00EE");

  vm.pc[0] = vm.stack[vm.sp[0]];
  vm.sp[0] -= 1;
  console.log(`PC set to ${vm.pc[0].toString(16)}...`)
  console.log(`SP set to ${vm.sp[0].toString(16)}...`)
};

export const _1nnn = (nibbles: number[], vm: VirtualMachine) => {
  // Jump to location nnn
  // set program counter to nnn
  console.log("...executing instruction 1nnn");

  vm.pc[0] = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
  console.log(`PC set to ${vm.pc[0].toString(16)}...`)
};


export const _2nnn = (nibbles: number[], vm: VirtualMachine) => {
  // Call subroutine at nnn
  // increment the stack pointer and puts PC on top of stack
  // PC is set to nnn
  console.log("...executing instruction 2nnn");
  
  vm.sp[0] += 1;
  vm.stack[vm.sp[0]] = vm.pc[0];
  vm.pc[0] = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
};


export const _3xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if Vx === kk
  console.log("...executing instruction 3xkk");

  let cmp: boolean = vm.v[nibbles[1]][0] === (nibbles[2] << 4 | nibbles[3]);
  if(cmp) { vm.pc[0] += 2; }

  console.log(`Value in V${nibbles[1].toString(16)} is ${cmp ? "equal" : "not equal"} to ${nibbles[2] << 4 | nibbles[3]}`)
};

export const _4xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if Vx !== kk
  console.log("...executing instruction 4xkk");

  let cmp: boolean = vm.v[nibbles[1]][0] === (nibbles[2] << 4 | nibbles[3]);
  if(!cmp) { vm.pc[0] += 2; }

  console.log(`Value in V${nibbles[1].toString(16)} is ${cmp ? "equal" : "not equal"} to ${nibbles[2] << 4 | nibbles[3]}`)
};

export const _5xy0 = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if Vx === Vy
  console.log("...executing instruction 5xy0");

  let cmp: boolean = vm.v[nibbles[1]][0] === vm.v[nibbles[2]][0];
  if(cmp) { vm.pc[0] += 2; }

  console.log(`Value in V${nibbles[1].toString(16)} is ${cmp ? "equal" : "not equal"} to V${nibbles[2].toString(16)}`)
};

export const _6xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Set register Vx = kk
  console.log("...executing instruction 6xkk");

  let idx = nibbles[1];
  vm.v[idx][0] = nibbles[2] << 4 | nibbles[3];
  console.log(`register V${idx.toString(16)} set to ${vm.v[idx][0].toString(16)}...`)
};

export const _7xkk = (nibbles:number[], vm: VirtualMachine) => {
  // Add the value kk to register Vx
  console.log("...executing instruction 7xkk");

  let idx = nibbles[1];
  vm.v[idx][0] += nibbles[2] << 4 | nibbles[3];
  console.log(`register V${idx.toString(16)} set to ${vm.v[idx][0].toString(16)}...`)
};

export const _8xy0 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vy
  console.log("...executing instruction 8xy0");

  vm.v[nibbles[1]][0] = vm.v[nibbles[2]][0];
};

export const _8xy1 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx OR Vy
  console.log("...executing instruction 8xy1");

  vm.v[nibbles[1]][0] = vm.v[nibbles[1]][0] | vm.v[nibbles[2]][0];
};

export const _8xy2 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx AND Vy
  console.log("...executing instruction 8xy2");

  vm.v[nibbles[1]][0] = vm.v[nibbles[1]][0] & vm.v[nibbles[2]][0];
};

export const _8xy3 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx XOR Vy
  console.log("...executing instruction 8xy3");

  vm.v[nibbles[1]][0] = vm.v[nibbles[1]][0] ^ vm.v[nibbles[2]][0];
}

export const _8xy4 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx + Vy
  // if Vx + Vy > 255, set Vf = 1 (carry) and Vx = (Vx + Vy) % 256
  console.log("...executing instruction 8xy4");

  let sum = vm.v[nibbles[1]][0] + vm.v[nibbles[2]][0];

  if(sum > 255) { vm.v[0xf][0] = 1; }
  else { vm.v[0xf][0] = 0; }

  vm.v[nibbles[1]][0] = sum % 256;

  console.log(`V${nibbles[1].toString(16)} + V${nibbles[2].toString(16)} = ${sum}`)
  console.log(`V${nibbles[1].toString(16)}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Vf: ${vm.v[0xf][0]}`)
}

export const _8xy5 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx - Vy
  // Vf is initialized to 1
  // if Vx - Vy < 0, set Vf = 0 and Vx = |Vx - Vy|
  console.log("...executing instruction 8xy5");

  vm.v[0xf][0] = 1;

  let diff = vm.v[nibbles[1]][0] - vm.v[nibbles[2]][0];
  if(diff < 0) { vm.v[0xf][0] = 0; }

  vm.v[nibbles[1]][0] = Math.abs(diff);

  console.log(`V${nibbles[1].toString(16)} - V${nibbles[2].toString(16)} = ${diff}`)
  console.log(`V${nibbles[1].toString(16)}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Vf: ${vm.v[0xf][0]}`)
}

export const _8xy6 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx >> 1
  // move the value of the bit shifted out to Vf
  // (i.e. if the least significant bit was 1, set Vf = 1; if the least significant bit was 0, set Vf = 0)
  console.log("...executing instruction 8xy6");

  // LEGACY RULE: Vx is set to Vy before shifting
  // vm.v[nibbles[1]][0] = vm.v[nibbles[2]][0];

  console.log(`Initial Value of V${nibbles[1]}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Initial Value of Vf: ${vm.v[0xf][0]}`)

  vm.v[0xf][0] = vm.v[nibbles[1]][0] % 2;
  vm.v[nibbles[1]][0] = vm.v[nibbles[1]][0] >> 1;

  console.log(`Final Value of V${nibbles[1]}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Final Value of Vf: ${vm.v[0xf][0]}`)
}

export const _8xy7 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vy - Vx
  // Vf is initialized to 1
  // if Vy - Vx < 0, set Vf = 0 and Vx = |Vy - Vx|
  console.log("...executing instruction 8xy7");

  vm.v[0xf][0] = 1;

  let diff = vm.v[nibbles[2]][0] - vm.v[nibbles[1]][0];
  if(diff < 0) { vm.v[0xf][0] = 0; }

  vm.v[nibbles[1]][0] = Math.abs(diff);

  console.log(`V${nibbles[2].toString(16)} - V${nibbles[1].toString(16)} = ${diff}`)
  console.log(`V${nibbles[1].toString(16)}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Vf: ${vm.v[0xf][0]}`)
}

export const _8xyE = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = Vx << 1
  // move the value of the bit shifted out to Vf
  // (i.e. if the most significant bit was 1, set Vf = 1; if the most significant bit was 0, set Vf = 0)
  console.log("...executing instruction 8xyE");

  // LEGACY RULE: Vx is set to Vy before shifting
  // vm.v[nibbles[1]][0] = vm.v[nibbles[2]][0];

  console.log(`Initial Value of V${nibbles[1]}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Initial Value of Vf: ${vm.v[0xf][0]}`)

  if(vm.v[nibbles[1]][0] > 127) { vm.v[0xf][0] = 1; }
  else { vm.v[0xf][0] = 0; }

  vm.v[nibbles[1]][0] = vm.v[nibbles[1]][0] << 1;

  console.log(`Final Value of V${nibbles[1]}: ${vm.v[nibbles[1]][0]}`)
  console.log(`Final Value of Vf: ${vm.v[0xf][0]}`)
}

export const _9xy0 = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if Vx !== Vy
  console.log("...executing instruction 9xy0");

  let cmp: boolean = vm.v[nibbles[1]][0] === vm.v[nibbles[2]][0];
  if(cmp) { vm.pc[0] += 2; }

  console.log(`Value in V${nibbles[1].toString(16)} is ${cmp ? "equal" : "not equal"} to ${nibbles[2] << 4 | nibbles[3]}`)
};

export const _Annn = (nibbles:number[], vm: VirtualMachine) => {
  // Set register I to nnn
  console.log("...executing instruction Annn");

  vm.i[0] = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
  console.log(`register I set to value: ${vm.i[0].toString(16)}...`)
};

export const _Bnnn = (nibbles:number[], vm: VirtualMachine) => {
  // Jump to location nnn + V0
  console.log("...executing instruction Bnnn");

  let nnn = (nibbles[1] << 4 | nibbles[2]) << 4 | nibbles[3];
  vm.pc[0] = nnn + vm.v[0][0];

  console.log(`PC set to address: ${vm.pc[0]}`)
}

export const _Cxkk = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx to a random byte AND kk
  console.log("...executing instruction Cnnn");

  let rng = Math.round((Math.random() * 255));
  let kk = nibbles[2] << 4 | nibbles[3];

  vm.v[nibbles[1]][0] = rng & kk;
  console.log(`V${nibbles[1]}: ${vm.v[nibbles[1]][0]}`)
}

export const _Dxyn = (nibbles:number[], vm: VirtualMachine) => {
  // Display n-byte sprite image on screen
  // get sprite data which starts at memory location I
  // drawing starts on coordinates (Vx, Vy) and will continue for n bytes
  // detect collision (set Vf = 1) when trying to draw a pixel on a coordinate that is already on
  console.log("...executing instruction Dxyn");

  let initRow = vm.v[nibbles[2]][0] & 31; // initial value of x (wraps around screen)
  let initCol = vm.v[nibbles[1]][0] & 63; // initial value of y (wraps around screen)
  vm.v[0xF][0] = 0; // initialize Vf to 0
  
  // loop n times to draw an n-byte sprite
  for(let j = 0; j < nibbles[3]; j++) {

    // if the sprite is beyond the bottom of the screen,
    // stop drawing this row
    if((initRow + j) >= vm.display.length) { break; }

    // get the nth byte of sprite data,
    // starting from the memory address stored in register I
    let spriteData = vm.memory[vm.i[0] + j];

    // a sprite byte contains 8 bits, each of which corresponds to a pixel
    // and can be extracted from spriteData via bitmasks
    let bitmasks = [128, 64, 32, 16, 8, 4, 2, 1];
    for(let k = 0; k < bitmasks.length; k++) {

      // if the sprite is beyond the right edge of the screen,
      // stop drawing
      if((initCol + k) >= vm.display[0].length) { break; }

      if(bitmasks[k] & spriteData) {
        // if the pixel is already on, set Vf = 1 (collision)
        // and do not draw the pixel
        if(vm.display[(initRow + j)][(initCol + k)] === true) { vm.v[0xf][0] = 1; }
        
        // else, draw the pixel
        else {
          vm.display[(initRow + j)][(initCol + k)] = true;
        }
      }
    }
  }
}

export const _Ex9E = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if key with value of vx is being pressed
  console.log("...executing instruction Ex9E");

  if(vm.keypad === nibbles[1]) { vm.pc[0] += 2; }
}

export const _ExA1 = (nibbles:number[], vm: VirtualMachine) => {
  // Skip next instruction if key with value of vx is NOT being pressed
  console.log("...executing instruction ExA1");

  if(vm.keypad !== nibbles[1]) { vm.pc[0] += 2; }
}

export const _Fx07 = (nibbles:number[], vm: VirtualMachine) => {
  // Set Vx = delay timer value
  console.log("...executing instruction Fx07");

  vm.v[nibbles[1]][0] = vm.delayTimer[0];
}

export const _Fx0A = (nibbles:number[], vm: VirtualMachine) => {
  // Wait for a key press, store the value of the key into Vx
  console.log("...executing instruction Fx0A");

  if(vm.keypad !== null) { vm.v[nibbles[1]][0] = vm.keypad; }
  else { vm.pc[0] -= 2; } // undo the increment of PC from the fetch step
}

export const _Fx15 = (nibbles:number[], vm: VirtualMachine) => {
  // Set delay timer = value in Vx
  console.log("...executing instruction Fx15");

  vm.delayTimer[0] = vm.v[nibbles[1]][0];
}

export const _Fx18 = (nibbles:number[], vm: VirtualMachine) => {
  // Set sound timer = value in Vx
  console.log("...executing instruction Fx18");

  vm.soundTimer[0] = vm.v[nibbles[1]][0];
}

export const _Fx1E = (nibbles:number[], vm: VirtualMachine) => {
  // Set I += Vx
  console.log("...executing instruction Fx1E");

  vm.i[0] += vm.v[nibbles[1]][0];
}

export const _Fx29 = (nibbles:number[], vm: VirtualMachine) => {
  // Set I = location of sprite for digit Vx
  console.log("...executing instruction Fx29");

  vm.i[0] = 0x50 + nibbles[1];
}

export const _Fx33 = (nibbles:number[], vm: VirtualMachine) => {
  // Store the Binary Coded Decimal representation of Vx at memory addresses stored in I, I+1, and I+2
  console.log("...executing instruction Fx33");

  let hundreds = Math.trunc(vm.v[nibbles[1]][0] / 100);
  let tens = Math.trunc(vm.v[nibbles[1]][0] / 10) % 10;
  let ones = vm.v[nibbles[1]][0] % 10;

  vm.memory[vm.i[0]] = hundreds;
  vm.memory[vm.i[0] + 1] = tens;
  vm.memory[vm.i[0] + 2] = ones;
}

export const _Fx55 = (nibbles:number[], vm: VirtualMachine) => {
  // Store registers V0 to Vx (inclusive) in memory starting at location I
  console.log("...executing instruction Fx55");

  for(let idx = 0; idx <= nibbles[1]; idx++) {
    vm.memory[vm.i[0] + idx] = vm.v[idx][0];
  }
}

export const _Fx65 = (nibbles:number[], vm: VirtualMachine) => {
  // Store values in memory starting at location I into registers V0 to Vx (inclusive)
  console.log("...executing instruction Fx65");

  for(let idx = 0; idx <= nibbles[1]; idx++) {
    vm.v[idx][0] = vm.memory[vm.i[0] + idx];
  }
}

export const unrecognized = (nibbles: number[]) => {
  console.error(`Unrecognized Instruction: ${nibbles.map((x) => x.toString(16))}`);
}
