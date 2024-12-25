const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * dp 테이블의 각 인덱스를 날짜로 정해야 할듯?
 *
 * dp[1] = 1일차.. 이런식으로?
 *
 * 그리고 상담에 필요한 필요 일수에도 접근해야되니까.. 따로 관리하거나 아니면 2차원 배열로 만들거나..?
 */

const n = Number(input[0]);

const T = [0];
const P = [0];

for (let i = 1; i <= n; i++) {
  const [t, p] = input[i].split(" ").map(Number);

  T.push(t);
  P.push(p);
}

const dp = Array(20).fill(0);

// 마지막 날짜부터 확인..
for (let i = n; i >= 1; i--) {
  // 상담이 가능하면 (7일차에도 T_i가 1이면 상담이 가능)
  if (i + T[i] <= n + 1) {
    dp[i] = Math.max(dp[i + 1], dp[i + T[i]] + P[i]);
  } else {
    dp[i] = dp[i + 1];
  }
}

console.log(Math.max(...dp));