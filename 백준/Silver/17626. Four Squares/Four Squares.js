const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 우선 어떤 수 N를 제곱수 합으로 나타낼 수 있는 거 같은데요..
 *
 * dp[i] = i를 제곱수의 합으로 나타내기 위한 최소 개수일 때,
 * dp[4] = 1 => 2의 제곱수 하나로 나타낼 수 있으니까.
 * dp[5] = 2 => dp[4] + 1
 *
 * dp[i] = min(dp[i], dp[i - j * j] + 1)
 */

const n = Number(input);
const dp = Array(n + 1).fill(Infinity);

dp[0] = 0;
dp[1] = 1;

for (let i = 2; i <= n; i++) {
  for (let j = 1; j * j <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
  }
}

console.log(dp[n]);
