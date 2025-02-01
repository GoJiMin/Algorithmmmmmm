const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);
const MOD = 10007;

const dp = Array(n + 1).fill(0);

dp[1] = 1;
dp[2] = 3;

for (let i = 3; i <= n; i++) {
  dp[i] = (2 * dp[i - 2] + dp[i - 1]) % MOD;
}

console.log(dp[n]);
