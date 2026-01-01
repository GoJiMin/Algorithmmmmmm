const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const board = [];

for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(''));
}

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const dist = Array.from({length: n}, () => Array(m).fill(-1));
dist[0][0] = 1;

const queue = [];
let head = 0;

queue.push([0, 0]);
while (head !== queue.length) {
  const [x, y] = queue[head++];

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (board[nx][ny] === '0' || dist[nx][ny] > -1) continue;

    dist[nx][ny] = dist[x][y] + 1;
    queue.push([nx, ny]);
  }
}

console.log(dist[n - 1][m - 1]);
