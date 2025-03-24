const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [m, n] = input[0].split(' ').map(Number);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split(''));

const vis = Array.from({length: n}, () => Array(m).fill(false));

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function dfs(i, j) {
  const stack = [[i, j]];
  vis[i][j] = true;

  let cnt = 1;
  while (stack.length) {
    const [x, y] = stack.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (board[nx][ny] === board[i][j] && !vis[nx][ny]) {
        stack.push([nx, ny]);
        vis[nx][ny] = true;
        cnt++;
      }
    }
  }

  return cnt;
}

let sumW = 0;
let sumB = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!vis[i][j]) {
      if (board[i][j] === 'W') {
        sumW += dfs(i, j) ** 2;
      } else {
        sumB += dfs(i, j) ** 2;
      }
    }
  }
}

console.log(sumW, sumB);
