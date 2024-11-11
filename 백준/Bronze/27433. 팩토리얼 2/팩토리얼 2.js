const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

let ans = 1;

for (let i = 1; i <= n; i++) {
  ans *= i;
}

console.log(ans);
