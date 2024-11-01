const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const p = input[1].split(" ").map(Number);

p.sort((a, b) => a - b);

let ans = 0;
let cur = 0;

for (let i = 0; i < n; i++) {
  cur += p[i];

  ans += cur;
}

console.log(ans);
