const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 판다는 상, 하, 좌, 우로 이동이 가능하다.
 * 욕심쟁이라 자신이 있던 위치보다 대나무가 더 많은 곳으로만 이동이 가능하다.
 *
 * 판다가 먹을 수 있는 대나무의 총량이 아닌, 판다가 최대로 이동할 수 있는 경우를 찾아야만 한다.
 *
 * 우선 n은 최대 500까지 주어지니까 최악의 경우 250000칸으로 각 칸마다 경로를 모두 탐색하면 아마 시간 초과가 무조건 발생.
 * (x, y) 좌표를 탐색한다면 해당 좌표에서 출발했을 때 나올 수 있는 최대 값을 메모이제이션할 필요가 있을듯..
 */

const n = Number(input[0]);
const area = [];

for (let i = 1; i <= n; i++) area.push(input[i].split(" ").map(Number));

const dp = Array.from({ length: n }, () => Array(n).fill(0));
const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(x, y) {
  // 이미 계산했으면 얼리 리턴..
  if (dp[x][y] !== 0) {
    return dp[x][y];
  }

  dp[x][y] = 1;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
    if (area[nx][ny] > area[x][y])
      dp[x][y] = Math.max(dp[x][y], 1 + dfs(nx, ny));
  }

  return dp[x][y];
}

let ans = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    ans = Math.max(ans, dfs(i, j));
  }
}

console.log(ans);
