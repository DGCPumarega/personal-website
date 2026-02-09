import * as Instruction from "$lib/components/chip-8/InstructionSet";

export type VirtualMachine = {
  memory: Uint8Array;
  display: boolean[][];
  pc: Uint16Array;
  i: Uint16Array;
  stack: Uint16Array;
  sp: Uint8Array;
  delayTimer: Uint8Array;
  soundTimer: Uint8Array;
  v: Uint8Array[];
  keypad: number | null;
}

export const createVM = () => {
  const VM: VirtualMachine = {
    memory: new Uint8Array(4096),
    display: Array.from({length: 32}, (): boolean[] => new Array(64).fill(false)),
    pc: new Uint16Array(1).fill(0x200),
    i: new Uint16Array(1),
    stack: new Uint16Array(16),
    sp: new Uint8Array(1),
    delayTimer: new Uint8Array(1),
    soundTimer: new Uint8Array(1),
    v: Array.from({length: 16}, (): Uint8Array => new Uint8Array(1)),
    keypad: null,
  };

  return VM;
}

export const loadFontSet = (VM: VirtualMachine, fontSet: Uint8Array) => {
  for(let i = 0; i < fontSet.length; i++) {
    VM.memory[0x50 + i] = fontSet[i];
  }
}

export const loadRom = (VM: VirtualMachine, romData: Uint8Array) => {
  for(let i = 0; i < romData.length; i++) {
    VM.memory[0x200 + i] = romData[i];
  }
}

export const runLoop = (VM: VirtualMachine) => {
  // fetch
  let idx = VM.pc[0];
  let opcode = VM.memory[idx] << 8 | VM.memory[idx + 1];
  VM.pc[0] += 2;

  // decode
  let nibbles = [
    (opcode & 0xF000) >> 12,
    (opcode & 0x0F00) >> 8,
    (opcode & 0x00F0) >> 4,
    (opcode & 0x000F),
  ];

  // execute
  switch(nibbles[0]) {
    case 0x0: 
      if(nibbles[1] === 0x0 && nibbles[2] === 0xE && nibbles[3] === 0xE) { Instruction._00EE(VM); break; }
      else if(nibbles[1] === 0x0 && nibbles[2] === 0xE && nibbles[3] === 0x0) { Instruction._00E0(VM); break; }
      else if(nibbles[1] === 0x0) { break; } // Instruction 0nnn is ignored by modern interpreters
      else{ Instruction.unrecognized(nibbles); break; }
    case 0x1:
      Instruction._1nnn(nibbles, VM); break;
    case 0x2:
      Instruction._2nnn(nibbles, VM); break;
    case 0x3:
      Instruction._3xkk(nibbles, VM); break;
    case 0x4:
      Instruction._4xkk(nibbles, VM); break;
    case 0x5:
      Instruction._5xy0(nibbles, VM); break;
    case 0x6:
      Instruction._6xkk(nibbles, VM); break;
    case 0x7:
      Instruction._7xkk(nibbles, VM); break;
    case 0x8:
      if(nibbles[3] === 0) { Instruction._8xy0(nibbles, VM); break;}
      else if(nibbles[3] === 0x1) { Instruction._8xy1(nibbles, VM); break;}
      else if(nibbles[3] === 0x2) { Instruction._8xy2(nibbles, VM); break;}
      else if(nibbles[3] === 0x3) { Instruction._8xy3(nibbles, VM); break;}
      else if(nibbles[3] === 0x4) { Instruction._8xy4(nibbles, VM); break;}
      else if(nibbles[3] === 0x5) { Instruction._8xy5(nibbles, VM); break;}
      else if(nibbles[3] === 0x6) { Instruction._8xy6(nibbles, VM); break;}
      else if(nibbles[3] === 0x7) { Instruction._8xy7(nibbles, VM); break;}
      else if(nibbles[3] === 0xE) { Instruction._8xyE(nibbles, VM); break;}
      else{ Instruction.unrecognized(nibbles); break; }
    case 0x9:
      Instruction._9xy0(nibbles, VM); break;
    case 0xA:
      Instruction._Annn(nibbles, VM); break;
    case 0xB:
      Instruction._Bnnn(nibbles, VM); break;
    case 0xC:
      Instruction._Cxkk(nibbles, VM); break;
    case 0xD:
      Instruction._Dxyn(nibbles, VM); break;
    case 0xE:
      if(nibbles[2] === 0x9 && nibbles[3] === 0xE) { Instruction._Ex9E(nibbles, VM); break;}
      else if(nibbles[2] === 0xA && nibbles[3] === 0x1) { Instruction._ExA1(nibbles, VM); break;}
      else{ Instruction.unrecognized(nibbles); break; }
    case 0xF:
      if(nibbles[2] === 0x0 && nibbles[3] === 0x7) { Instruction._Fx07(nibbles, VM); break; }
      else if(nibbles[2] === 0x0 && nibbles[3] === 0xA) { Instruction._Fx0A(nibbles, VM); break; }
      else if(nibbles[2] === 0x1 && nibbles[3] === 0x5) { Instruction._Fx15(nibbles, VM); break; }
      else if(nibbles[2] === 0x1 && nibbles[3] === 0x8) { Instruction._Fx18(nibbles, VM); break; }
      else if(nibbles[2] === 0x1 && nibbles[3] === 0xE) { Instruction._Fx1E(nibbles, VM); break; }
      else if(nibbles[2] === 0x2 && nibbles[3] === 0x9) { Instruction._Fx29(nibbles, VM); break; }
      else if(nibbles[2] === 0x3 && nibbles[3] === 0x3) { Instruction._Fx33(nibbles, VM); break; }
      else if(nibbles[2] === 0x5 && nibbles[3] === 0x5) { Instruction._Fx55(nibbles, VM); break; }
      else if(nibbles[2] === 0x6 && nibbles[3] === 0x5) { Instruction._Fx65(nibbles, VM); break; }
      else{ Instruction.unrecognized(nibbles); break; }
    default:
      Instruction.unrecognized(nibbles); 
  }
}
