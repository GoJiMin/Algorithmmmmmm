const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, k] = input[idx++].split(' ').map(Number);

let board = [];
for (let i = 0; i < n; i++) board.push(input[idx++].split(' ').map(Number));

const [s, x, y] = input[idx].split(' ').map(Number);

const viruses = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (board[i][j] !== 0)
      viruses.push({
        num: board[i][j],
        time: 0,
        x: i,
        y: j,
      });
  }
}

viruses.sort((a, b) => a.num - b.num);

let head = 0;
const queue = viruses;

const dirs = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

while (head < queue.length) {
  const {num, time, x, y} = queue[head++];

  // 시간 다 됐으면 나가기
  if (time === s) break;

  for (const [dx, dy] of dirs) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
    if (board[nx][ny] === 0) {
      board[nx][ny] = num;
      queue.push({
        num,
        time: time + 1,
        x: nx,
        y: ny,
      });
    }
  }
}

console.log(board[x - 1][y - 1]);
