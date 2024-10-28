const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

const d = Array(n + 1).fill(0);
const mod = 10007;

d[1] = 1;
d[2] = 2;

for (let i = 3; i <= n; i++) {
  d[i] = (d[i - 2] + d[i - 1]) % mod;
}

console.log(d[n]);
