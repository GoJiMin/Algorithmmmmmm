const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;

const k = Number(input[idx++]);
const [w, h] = input[idx++].split(' ').map(Number);

const board = [];
for (let i = 0; i < h; i++) board.push(input[idx++].trim().split(' '));

// vis[x][y][z] = true => x,y 좌표에 말처럼 움직이는 횟수가 k번 남긴 상태로 가봤음.
const vis = Array.from({length: h}, () => Array.from({length: w}, () => Array(k + 1).fill(false)));

// 기본 4방향 => 상, 하, 좌, 우
const moves4 = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// like 말.
const moves8 = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

// [x, y, 이동 가능한 횟수, 거리]
const queue = [[0, 0, k, 0]];
vis[0][0][k] = true;

let head = 0;
while (head !== queue.length) {
  const [x, y, k, dist] = queue[head++];

  // 도착함.
  if (x === h - 1 && y === w - 1) {
    console.log(dist);
    process.exit(0);
  }

  // 상, 하, 좌, 우 탐색
  for (const [dx, dy] of moves4) {
    const nx = x + dx;
    const ny = y + dy;

    if (nx < 0 || nx >= h || ny < 0 || ny >= w) continue;
    // 장애물이 있거나 방문했으면
    if (board[nx][ny] === '1' || vis[nx][ny][k]) continue;

    queue.push([nx, ny, k, dist + 1]);
    vis[nx][ny][k] = true;
  }

  // 말처럼 움직이는게 가능하면
  if (k > 0) {
    for (const [dx, dy] of moves8) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= h || ny < 0 || ny >= w) continue;
      // 이미 말처럼 움직인 곳이 방문한 곳이라면
      if (board[nx][ny] === '1' || vis[nx][ny][k - 1]) continue;

      queue.push([nx, ny, k - 1, dist + 1]);
      vis[nx][ny][k - 1] = true;
    }
  }
}

console.log(-1);
