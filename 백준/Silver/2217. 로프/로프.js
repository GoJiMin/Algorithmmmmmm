const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const ropes = [];

for (let i = 1; i <= n; i++) {
  ropes.push(Number(input[i]));
}

ropes.sort((a, b) => a - b);

let ans = 0;

for (let i = 1; i <= n; i++) {
  ans = Math.max(ans, ropes[n - i] * i);
}

console.log(ans);
