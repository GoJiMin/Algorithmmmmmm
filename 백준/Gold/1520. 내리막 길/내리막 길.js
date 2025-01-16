const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이동 가능한 영역은 상, 하, 좌, 우.
 * 현재 쓰여있는 점수보다 낮은 점수가 적힌 영역으로만 이동 가능.
 *
 * 아니 근데 이거 DP로 풀 수 있나..? 그냥 dfs로 푸는게 좋지 않나?
 */

/**
 * 탐색 중 고려할 사항..
 * 만약 (nx, ny)가 목표 지점에 도달했을 때 return을 할지, 혹은 (x, y)가 목표 지점에 도달했을 때 return을 할지..
 *
 * 전자의 경우 현재 위치에서 왼쪽으로 가지 못한채 return이 될까? 때문..
 *
 * 제출했는데 실패.. 아마 메모이제이션이 필요한듯..
 */

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

const dp = Array.from({ length: n }, () => Array(m).fill(-1));

function dfs(x, y) {
  if (x === n - 1 && y === m - 1) return 1;

  if (dp[x][y] > -1) return dp[x][y];

  dp[x][y] = 0;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (board[x][y] > board[nx][ny]) dp[x][y] += dfs(nx, ny);
  }

  return dp[x][y];
}

console.log(dfs(0, 0));
