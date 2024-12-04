const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);
const f = Array(n);

f[0] = 0;
f[1] = 1;
f[2] = 1;

for (let i = 3; i <= n; i++) {
  f[i] = f[i - 2] + f[i - 1];
}

console.log(f[n], n - 2);
