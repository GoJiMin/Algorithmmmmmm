const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, ...stairs] = input.map(Number);

const d = Array.from(Array(305), () => Array(3).fill(0));

d[1][1] = stairs[0];
d[1][2] = 0;

d[2][1] = stairs[1];
d[2][2] = stairs[0] + stairs[1];

for (let i = 3; i <= n; i++) {
  d[i][1] = Math.max(d[i - 2][1], d[i - 2][2]) + stairs[i - 1];
  d[i][2] = d[i - 1][1] + stairs[i - 1];
}

console.log(Math.max(d[n][1], d[n][2]));
