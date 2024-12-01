const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

// dp[n] = dp[n - 1] + dp[n - 2]

const n = Number(input);
const dp = Array(n + 1);

dp[0] = 0;
dp[1] = 1;
dp[2] = 1;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

console.log(dp[n]);
