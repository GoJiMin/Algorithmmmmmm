const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * N = 7, P = 2, Q = 3
 * A0 = 1
 * A1 = A(1 / 2) + A(1 / 3) => A0 + A0 = 2
 * A2 = A(2 / 2) + A(2 / 3) => A1 + A0 = 3
 * A3 = A(3 / 2) + A(3 / 3) => A1 + A1 = 4
 * A4 = A(4 / 2) + A(4 / 3) => A2 + A1 = 5
 * A5 = A(5 / 2) + A(5 / 3) => A2 + A2 = 6
 * A6 = A(6 / 2) + A(6 / 3) => A3 + A2 = 7
 * A7 = A(7 / 2) + A(7 / 3) => A3 + A2 = 7
 *
 * 아.. 이거 그냥 대놓고 DP였네요..
 */

const [N, P, Q] = input.split(" ").map(Number);

// const dp = Array(N + 1);

// dp[0] = 1; // A0 = 1이니까..

// for (let i = 1; i <= N; i++) {
//   dp[i] = dp[Math.floor(i / P)] + dp[Math.floor(i / Q)];
// }

// console.log(dp[N]);

// N이 10의 12승이라 메모리 초과당했습니다. 아마 재귀 + Map으로 풀어야할듯?

const dp = new Map();

dp.set(0, 1); // A0 = 1

function rec(i) {
  if (dp.has(i)) return dp.get(i); // Base Case

  const val = rec(Math.floor(i / P)) + rec(Math.floor(i / Q));
  dp.set(i, val); // 메모이제이션..

  return val;
}

console.log(rec(N));
