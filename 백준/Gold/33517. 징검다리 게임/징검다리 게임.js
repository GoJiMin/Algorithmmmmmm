const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const bridge = input[1].split(" ").map(Number);

const k = Number(input[2]);
const macro = input[3].trim().split("");

if (!macro.includes("J")) {
  console.log("NO");
  process.exit();
}

const macroDouble = macro.concat(macro);
const m = macroDouble.length;

const prefix = new Array(m + 1);
prefix[0] = 0;
for (let i = 0; i < m; i++) {
  prefix[i + 1] = prefix[i] + (macroDouble[i] === "A" ? 1 : 0);
}

const nextJIndex = new Array(m);
let next = -1;
for (let i = m - 1; i >= 0; i--) {
  if (macroDouble[i] === "J") next = i;
  nextJIndex[i] = next;
}

function processEmpty(j) {
  let pos = nextJIndex[j];
  if (pos === -1 || pos >= j + k) {
    return null;
  }
  let dist = pos - j + 1;
  let newJ = (j + dist) % k;
  return { newJ, commands: dist };
}

function processBear(j, h) {
  let pos = nextJIndex[j];
  if (pos === -1 || pos >= j + k) return null;
  let dist = pos - j + 1;
  let countA = prefix[pos] - prefix[j];
  if (countA < h) return null;
  let newJ = (j + dist) % k;
  return { newJ, commands: dist };
}

function processMine(j) {
  if (macro[j] !== "D") return null;
  let j2 = (j + 1) % k;
  let res = processEmpty(j2);
  if (res === null) return null;
  return { newJ: res.newJ, commands: 1 + res.commands };
}

let currentMacroIndex = 0;
let totalCommands = 0;

for (let i = 1; i < n - 1; i++) {
  let cell = bridge[i];
  let res = null;
  if (cell === 0) {
    res = processEmpty(currentMacroIndex);
  } else if (cell > 0) {
    res = processBear(currentMacroIndex, cell);
  } else if (cell === -1) {
    res = processMine(currentMacroIndex);
  }
  if (res === null) {
    console.log("NO");
    process.exit();
  }
  totalCommands += res.commands;
  currentMacroIndex = res.newJ;
}

console.log("YES");
