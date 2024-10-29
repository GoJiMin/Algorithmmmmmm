const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nk, ...arr] = input;

const [n, k] = nk.split(" ").map(Number);
const coins = arr.map(Number);

let ans = 0;
let tmp = k;

for (let i = n - 1; i >= 0; i--) {
  ans += Math.floor(tmp / coins[i]);
  tmp %= coins[i];
}

console.log(ans);
