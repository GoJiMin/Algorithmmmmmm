const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const dp = Array(n).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < n; i++) {
  if (dp[i] === Infinity) continue;

  let jumpLen = arr[i];

  for (let step = 1; step <= jumpLen; step++) {
    let next = i + step;
    if (next >= n) break;

    dp[next] = Math.min(dp[next], dp[i] + 1);
  }
}
const ans = dp[n - 1];

console.log(ans === Infinity ? -1 : ans);
