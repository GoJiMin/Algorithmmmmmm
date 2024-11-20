const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

let ans = 0;

function bt(k, idx, sum) {
  if (k === 3) {
    if (sum <= m && ans <= sum) ans = sum;

    return;
  }

  for (let i = idx; i < n; i++) {
    bt(k + 1, i + 1, sum + cards[i]);
  }
}

bt(0, 0, 0);

console.log(ans);
