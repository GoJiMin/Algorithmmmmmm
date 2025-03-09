const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const l = Number(input[0]);
const str = input[1];

const MOD = 123_456_789_1;

function hashing(s, i) {
  const n = s.charCodeAt() - 96;

  return (n * (31 ** i % MOD)) % MOD;
}

let result = 0;

for (let i = 0; i < l; i++) {
  result += hashing(str[i], i);
}

console.log(result);
