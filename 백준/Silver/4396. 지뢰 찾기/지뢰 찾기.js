const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const n = Number(input[idx++]);

const board = [];
for (let i = 0; i < n; i++) {
  board.push(input[idx++].trim().split(''));
}

const progress = [];
for (let i = 0; i < n; i++) {
  progress.push(input[idx++].trim().split(''));
}

const directions = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
  [-1, -1], // 상-좌
  [-1, 1], // 상-우
  [1, -1], // 하-좌
  [1, 1], // 하-우
];

function countMine(x, y) {
  let mine = 0;
  for (let dir = 0; dir < 8; dir++) {
    const [dx, dy] = directions[dir];

    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
    if (board[nx][ny] === '*') mine++;
  }

  return mine;
}

const mineDir = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // 지뢰는 좌표 넣어두고 넘어가기
    if (board[i][j] === '*') {
      mineDir.push([i, j]);
      continue;
    }
    board[i][j] = countMine(i, j);
  }
}

let flag = false;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (progress[i][j] === 'x') {
      // 열었는데 지뢰 밟았으면 지뢰 다 표시.
      if (board[i][j] === '*') flag = true;
      progress[i][j] = board[i][j];
    }
  }
}

if (flag) {
  mineDir.forEach(([x, y]) => (progress[x][y] = '*'));
}

console.log(progress.map(row => row.join('')).join('\n'));
