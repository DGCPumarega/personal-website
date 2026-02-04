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
  keypad: Uint8Array;
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
    keypad: new Uint8Array(1),
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

  let nibbles = [
    (opcode & 0xF000) >> 12,
    (opcode & 0x0F00) >> 8,
    (opcode & 0x00F0) >> 4,
    (opcode & 0x000F),
  ];

  console.log(opcode);
  console.log(nibbles);

  // decode
  // ...

  // execute
  // ...

}
