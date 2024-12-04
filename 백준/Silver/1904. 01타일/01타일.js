const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 00 타일과 1타일만을 사용해 수열을 만들 수 있다.
 * ex) N = 3일 때, 00 + 1, 1 + 00, 1 + 1 + 1
 *
 * N = 1, [1] => 1
 * N = 2, [00, 11] => 2
 * N = 3, [001, 100, 111] => 3
 * N = 4, [0000, 1100, 0011, 1001, 1111] => 5
 * N = 5, [00001, 10000, 11100, 11001, 10011, 00111, 00100, 11111] => 8
 */

/**
 * 어라 ~?
 * dp[i] = dp[i - 1] + dp[i - 2]
 */

const n = Number(input);

const dp = Array(n + 1);

dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
}

console.log(dp[n]);