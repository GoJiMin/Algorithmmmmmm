const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 이거 피보나치 같은데..
 */

const n = Number(input);

const dp = Array(n + 1);

dp[1] = 1n;
dp[2] = 1n;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

console.log(dp[n].toString());
