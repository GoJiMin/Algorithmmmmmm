const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const t = Number(input[idx++]);
const dp = Array.from({ length: 15 }, () => Array(15).fill(0)); // n, k <= 14

// 0층의 i호에는 i명이 산다.
for (let i = 1; i < 15; i++) {
  dp[0][i] = i;
}

/**
 * i층의 j호에 살고 싶으면, i - 1층의 j호까지 사는 사람들의 수의 합만큼 사람이 살아야 함.
 *
 * 1층의 3호에 살고 싶다면, 0층의 1호부터 3호까지의 사람의 합이 필요함.
 * dp[1][3] = dp[0][1] + dp[0][2] + dp[0][3] => 6
 */
for (let i = 1; i < 15; i++) {
  for (let j = 0; j < 15; j++) {
    for (let k = 0; k <= j; k++) {
      dp[i][j] += dp[i - 1][k];
    }
  }
}

const result = [];
for (let i = 0; i < t; i++) {
  const k = Number(input[idx++]);
  const n = Number(input[idx++]);

  result.push(dp[k][n]);
}

console.log(result.join("\n"));
