const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * n C k
 *
 * n개의 수 중에서 k개를 고른다.
 * n개 중에서 1개를 골랐다면
 * n - 1 C k - 1
 *
 * n개 중에서 수 1개를 제외하고 고른다면
 * n - 1 C k
 *
 * n C k = (n - 1) C (k - 1) + (n - 1) C k
 *
 * 아무것도 고르지 않는 경우의 수는 1개.
 * i개의 정수 중에 1개를 고르는 경우의 수는 i개.
 */

const [n, k] = input.split(" ").map(Number);

const dp = Array.from({ length: n + 1 }, () => Array(k + 1).fill(0));

const MOD = 10_007;

for (let i = 0; i <= n; i++) {
  dp[i][0] = 1;
  dp[i][1] = i;
}

for (let i = 1; i <= n; i++) {
  for (let j = 2; j <= k; j++) {
    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j]) % MOD;
  }
}

console.log(dp[n][k]);
