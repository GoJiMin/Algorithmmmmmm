const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const n = Number(input);
const MOD = 1_000_000_007;

const dp = Array(n + 1);

dp[0] = 0;
dp[1] = 1;

for (let i = 2; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
}

console.log(dp[n] % MOD);
