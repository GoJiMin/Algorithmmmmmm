const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input.shift());
const rgb = input.map((el) => el.trim().split(" ").map(Number));

const d = Array.from(Array(n + 1), () => Array(3).fill(0));

d[0][0] = rgb[0][0];
d[0][1] = rgb[0][1];
d[0][2] = rgb[0][2];

for (let k = 1; k < n; k++) {
  d[k][0] = Math.min(d[k - 1][1], d[k - 1][2]) + rgb[k][0];
  d[k][1] = Math.min(d[k - 1][0], d[k - 1][2]) + rgb[k][1];
  d[k][2] = Math.min(d[k - 1][0], d[k - 1][1]) + rgb[k][2];
}

console.log(Math.min(...d[n - 1]));
