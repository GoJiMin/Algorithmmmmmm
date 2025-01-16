const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 준규가 움직일 수 있는 경우의 수는 3가지..
 *
 * (r, c)가 현재 위치일 때, (r + 1, c), (r, c + 1), (r + 1, c + 1)
 * 아래로 내려가거나, 오른쪽으로 움직이거나, 혹은 아래 오른쪽 대각선으로 이동 가능.
 *
 * 테이블은 각 영역에 도착했을 때의 최대 값으로 설정하면 될듯?..
 *
 * 인덱스는 1부터 시작하니까 (1, 1)부터 시작함. 문제의 요구사항은 (n, m)에 도착했을 때의 최대 값임.
 * 그럼 반대로 (n, m)의 값을 찾기 위해서 (n - 1, c), (n, c - 1), (n - 1, c - 1) 중 최대 값을 찾아
 * (n, m)의 값과 더해줘야만 함.
 *
 * 그럼 점화식은 이렇게 나오지 않을까요..?
 * dp[i][j] = max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + a[i][j]
 */
const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    dp[i][j] =
      Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) +
      board[i - 1][j - 1];
  }
}

console.log(dp[n][m]);
