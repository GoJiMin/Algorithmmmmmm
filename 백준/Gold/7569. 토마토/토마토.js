const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [M, N, H] = input[idx++].split(' ').map(Number);

const board = Array.from({length: H}, () => []);
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) board[i].push(input[idx++].trim().split(' '));
}

const dz = [-1, 0, 1];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const dist = Array.from({length: H}, () => Array.from({length: N}, () => Array(M).fill(-1)));

const queue = [];
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (board[i][j][k] === '-1') dist[i][j][k] = 0;
      else if (board[i][j][k] === '1') {
        queue.push([i, j, k]);
        dist[i][j][k] = 0;
      }
    }
  }
}

let head = 0;
while (head !== queue.length) {
  const [z, x, y] = queue[head++];

  for (let dir = 0; dir < 3; dir++) {
    const nz = z + dz[dir];

    if (nz < 0 || nz >= H) continue;
    if (dist[nz][x][y] > -1) continue;

    queue.push([nz, x, y]);
    dist[nz][x][y] = dist[z][x][y] + 1;
  }

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (dist[z][nx][ny] > -1) continue;

    queue.push([z, nx, ny]);
    dist[z][nx][ny] = dist[z][x][y] + 1;
  }
}

let max = -1;
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (dist[i][j][k] === -1) {
        console.log(-1);
        return;
      }

      max = Math.max(max, dist[i][j][k]);
    }
  }
}

console.log(max);
