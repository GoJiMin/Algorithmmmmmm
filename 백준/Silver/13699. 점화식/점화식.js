const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const n = Number(input);
const dp = Array(n + 1);

dp[0] = 1n;

/**
 * dp[1] = dp[0] * dp[0] = 1n
 * dp[2] = dp[0] * dp[1] + dp[1] * dp[0] = 2n
 * dp[3] = dp[0] * dp[2] + dp[1] * dp[1] + dp[2] * dp[0] = 5n
 */

for (let i = 1; i <= n; i++) {
  dp[i] = 0n;
  for (let j = 0; j < i; j++) {
    dp[i] += dp[j] * dp[i - j - 1];
  }
}

console.log(dp[n].toString());
