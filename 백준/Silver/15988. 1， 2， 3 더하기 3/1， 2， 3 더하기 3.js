const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const MAX = 100_0001;
const MOD = 1_000_000_009;

const dp = Array(MAX);

dp[1] = 1; // 1
dp[2] = 2; // 1 + 1, 2
dp[3] = 4; // 1 + 1 + 1, 1 + 2, 2 + 1, 3

// 그럼 d[4]는?
// 3을 1 2 3으로 나타낼 수 있는 방법에 1을 더할 수 있음 d[3] + 1
// 2를 1 2 3으로 나타낼 수 있는 방법에 2를 더할 수 있음 d[2] + 2
// 1을 1 2 3으로 나타낼 수 있는 방법에 3을 더할 수 있음 d[1] + 3
// d[4] = dp[3] + d[2] + d[1]

for (let i = 4; i < MAX; i++) {
  dp[i] = (dp[i - 3] + dp[i - 2] + dp[i - 1]) % MOD;
}

const result = [];
for (let i = 1; i <= n; i++) {
  result.push(dp[Number(input[i])]);
}

console.log(result.join("\n"));
