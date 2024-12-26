const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const N = Number(input);
const MOD = 10007;

const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

// 길이가 1인 모든 오르막 수는 1개
for (let j = 0; j <= 9; j++) {
  dp[1][j] = 1;
}

for (let i = 2; i <= N; i++) {
  for (let j = 0; j <= 9; j++) {
    dp[i][j] = dp[i][j - 1] || 0; // j-1이 존재하면 이전 값을 누적
    dp[i][j] = (dp[i][j] + dp[i - 1][j]) % MOD; // dp[i-1][j]를 더함
  }
}

const result = dp[N].reduce((sum, count) => (sum + count) % MOD, 0);

console.log(result);
