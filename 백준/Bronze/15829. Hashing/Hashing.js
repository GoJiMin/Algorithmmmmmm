const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const l = Number(input[0]);
const str = input[1];

const MOD = 123_456_789_1n;
const BASE = 31n;

let pow = 1n;
let result = 0n;

for (let i = 0n; i < l; i++) {
  const n = BigInt(str[i].charCodeAt(0) - 96);
  result = (result + n * pow) % MOD;
  pow = (pow * BASE) % MOD;
}

console.log(result.toString());
