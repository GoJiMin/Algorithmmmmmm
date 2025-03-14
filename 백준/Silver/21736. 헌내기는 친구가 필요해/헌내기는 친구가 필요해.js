const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].trim().split(""));

const directions = [
  [1, 0], // 상
  [-1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
];

const vis = Array.from({ length: n }, () => Array(m).fill(false));

let cnt = 0;
function dfs(I) {
  const stack = [I];
  vis[I[0]][I[1]] = true;

  while (stack.length) {
    const [x, y] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [dx, dy] = directions[i];

      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      // 벽이 아니고 방문하지 않았을 경우에만 이동이 가능.
      if (board[nx][ny] !== "X" && !vis[nx][ny]) {
        stack.push([nx, ny]);
        vis[nx][ny] = true;

        if (board[nx][ny] === "P") cnt++; // 사람일 경우엔 cnt 증가
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  let flag = false;

  if (flag) break;
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "I") {
      dfs([i, j]);
      flag = true;
      break;
    }
  }
}

console.log(cnt ? cnt : "TT");
