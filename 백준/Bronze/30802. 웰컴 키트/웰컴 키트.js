const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const [t, p] = input[2].split(" ").map(Number);

let cntT = 0;
for (let i = 0; i < 6; i++) {
  cntT += Math.floor((arr[i] + t - 1) / t);
}

console.log(cntT);
console.log(Math.floor(n / p), n % p);
