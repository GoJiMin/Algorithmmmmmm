const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * DP[i] = i원을 지불할 때 필요한 최소 동전 개수..
 *
 * dp[0] = 0 => 0원은 동전 0개
 *
 * dp[i] = min(dp[i], dp[i - coin] + 1)
 */

const n = Number(input[0]);

const coins = [1, 2, 5, 7];

const dp = Array(n + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= n; i++) {
  for (const coin of coins) {
    if (i >= coin) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
}

console.log(dp[n]);
