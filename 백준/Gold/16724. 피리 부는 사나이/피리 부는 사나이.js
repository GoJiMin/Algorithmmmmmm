const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 사실 사이클 세는 문제..
 *
 * 안전 영역이 있는 경로에 도착한다면, 도착한 경로도 안전 영역 한개로 함께 커버됨.
 */

const [n, m] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(""));
}

const visited = Array.from({ length: n }, () => Array(m).fill(false));
const finished = Array.from({ length: n }, () => Array(m).fill(false));

const directions = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

let cnt = 0;
function dfs(x, y) {
  visited[x][y] = true;

  const [dx, dy] = directions[board[x][y]];
  const nx = x + dx;
  const ny = y + dy;

  if (!visited[nx][ny]) {
    dfs(nx, ny);
  } else if (!finished[nx][ny]) {
    // 아직 완료되지 않은 노드로 도착하면 사이클임
    cnt++;
  }

  finished[x][y] = true;
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j]) dfs(i, j);
  }
}

console.log(cnt);
