const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const table_T = [0];
const table_P = [0];

for (let i = 1; i <= n; i++) {
  const [t, p] = input[i].split(" ").map(Number);

  table_T.push(t);
  table_P.push(p);
}

const dp = Array(n + 2).fill(0);

for (let i = n; i >= 1; i--) {
  // 현재 날짜와 상담에 걸리는 시간을 더했을 때, 퇴사하기 전이라면,
  if (i + table_T[i] <= n + 1) {
    // 이전까지의 금액과 현재 날짜에서 상담 종료일에 현재 금액을 더한 값과 비교.
    dp[i] = Math.max(dp[i + 1], dp[i + table_T[i]] + table_P[i]);
  } else {
    // 아니면 그냥 전날 금액 가져오기.
    dp[i] = dp[i + 1];
  }
}

// 어쨌든 1번 인덱스에 최대값이 들어옴.
console.log(dp[1]);
