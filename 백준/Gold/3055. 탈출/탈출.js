const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [r, c] = input[0].split(' ').map(Number);

const board = [];

for (let i = 1; i <= r; i++) board.push(input[i].trim().split(''));

const distWater = Array.from({length: r}, () => Array(c).fill(-1));
const distHed = Array.from({length: r}, () => Array(c).fill(-1));

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

// 비어있는 곳은 '.', 물이 차있는 지역은 '*', 돌은 'X', 비버의 굴은 'D', 고슴도치의 위치는 'S'

const waterQueue = [];
const hedQueue = [];

let targetX = 0;
let targetY = 0;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (board[i][j] === '*') {
      waterQueue.push([i, j]);
      distWater[i][j] = 0;
    } else if (board[i][j] === 'X') {
      distWater[i][j] = 0;
      distHed[i][j] = 0;
    } else if (board[i][j] === 'D') {
      distWater[i][j] = 0;
      targetX = i;
      targetY = j;
    } else if (board[i][j] === 'S') {
      distHed[i][j] = 0;
      hedQueue.push([i, j]);
    }
  }
}

while (waterQueue.length) {
  const [x, y] = waterQueue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    if (distWater[nx][ny] < 0) {
      waterQueue.push([nx, ny]);
      distWater[nx][ny] = distWater[x][y] + 1;
    }
  }
}

while (hedQueue.length) {
  const [x, y] = hedQueue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    // 찾으면 종료시켜버리기
    if (board[nx][ny] === 'D') {
      console.log(distHed[x][y] + 1);
      process.exit(0);
    }
    // 내가 이동할 지점에 물이 차면 이동할 수 없음.
    if (distWater[nx][ny] !== -1 && distHed[x][y] + 1 >= distWater[nx][ny]) continue;
    if (distHed[nx][ny] < 0) {
      hedQueue.push([nx, ny]);
      distHed[nx][ny] = distHed[x][y] + 1;
    }
  }
}

console.log('KAKTUS');
