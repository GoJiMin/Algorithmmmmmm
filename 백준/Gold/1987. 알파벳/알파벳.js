const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 아니 이거 완전 dfs 문제잖아요? 자신 있습니다.....예..
 */

const [r, c] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= r; i++) board.push(input[i].trim().split(""));

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

let max = 0;
const vis = new Set();

function dfs(x, y, count) {
  max = Math.max(count, max);
  vis.add(board[x][y]);

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    if (vis.has(board[nx][ny])) continue;

    dfs(nx, ny, count + 1);
  }

  vis.delete(board[x][y]);
}

dfs(0, 0, 1);

console.log(max);
