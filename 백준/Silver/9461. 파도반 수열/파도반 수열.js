const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * P(1)부터 P(10)은 다음과 같다.
 * 1, 1, 1, 2, 2, 3, 4, 5, 7, 9
 *
 * 어라 ~ ?
 * dp[i] = dp[i - 1] + dp[i - 5]
 */

const dp = Array(101);

dp[1] = 1;
dp[2] = 1;
dp[3] = 1;
dp[4] = 2;
dp[5] = 2;
dp[6] = 3;

for (let i = 7; i <= 100; i++) {
  dp[i] = dp[i - 1] + dp[i - 5];
}

const n = Number(input[0]);

const result = [];

for (let i = 1; i <= n; i++) {
  result.push(dp[Number(input[i])]);
}

console.log(result.join("\n"));
