const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 나이트가 이동 가능한 범위는 총 8개..
 *
 * 정해진 칸으로 이동하는데 총 몇 번 움직여야 하는지..
 *
 * [x, y] 좌표일 때 나이트는
 * [x + 1, y + 2],
 * [x + 2, y + 1],
 * [x - 1, y + 2]
 * [x - 2, y + 1],
 * [x + 1, y - 2],
 * [x + 2, y - 1],
 * [x - 1, y - 2],
 * [x - 2, y - 1]
 *
 * 로 이동이 가능..
 */

const dirs = [
  [1, 2],
  [2, 1],
  [-1, 2],
  [-2, 1],
  [1, -2],
  [2, -1],
  [-1, -2],
  [-2, -1],
];

let idx = 0;
const T = Number(input[idx++]);

const result = [];
for (let t = 0; t < T; t++) {
  const l = Number(input[idx++]);

  const [startX, startY] = input[idx++].split(' ').map(Number);
  const [targetX, targetY] = input[idx++].split(' ').map(Number);

  const dist = Array.from({length: l}, () => Array(l).fill(-1));

  const queue = [[startX, startY]];
  dist[startX][startY] = 0;

  let head = 0;
  while (dist[targetX][targetY] === -1) {
    const [x, y] = queue[head++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= l || ny < 0 || ny >= l) continue;
      if (dist[nx][ny] === -1) {
        queue.push([nx, ny]);
        dist[nx][ny] = dist[x][y] + 1;
      }
    }
  }

  result.push(dist[targetX][targetY]);
}

console.log(result.join('\n'));
