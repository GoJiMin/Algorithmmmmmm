const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const strs = input[1];

let cntANA = 0;

let isA = false;
let cntN = 0;

for (let i = 0; i < n; i++) {
  if (strs[i] === "A") {
    isA = true;
  }

  if (isA && strs[i] === "N") {
    cntN++;
  }

  if (isA && cntN > 0 && strs[i] === "A") {
    if (cntN === 1) cntANA++;

    cntN = 0;
  }
}

console.log(cntANA);
