const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * |b - y| <= 2 이하일 때만 이동이 가능..
 * 어쨌든 바닥에서 T까지 올라가야 하니 y 좌표 값으로 오름차순 정렬?
 *
 * 그리고 y좌표가 같다면 x 좌표 값으로 오름차순? 0,0에서 올라가긴 하니까
 *
 * 그렇다면 탐색은 BFS를 돌리면 될 거 같은데, 지금 내가 위치한 y 좌표에서 이동 가능한 좌표는?
 *
 * n은 최대 50000까지 주어짐. 내가 위치한 y 좌표가 10000이라면 이동 가능한 홈은 9998 <= y <= 10000.
 * 이건 너무 이진탐색인데..
 */

const [n, T] = input[0].split(' ').map(Number);

const positions = [];
for (let i = 1; i <= n; i++) positions.push(input[i].split(' ').map(Number));

positions.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

const vis = Array(n).fill(false);

const queue = [[0, 0, 0]];
let head = 0;

while (queue.length > head) {
  const [cx, cy, dist] = queue[head++];

  if (cy === T) {
    console.log(dist);
    process.exit(0);
  }

  let startIdx = 0;
  let left = 0;
  let right = positions.length - 1;

  // lower bound..
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (positions[mid][1] >= cy - 2) {
      startIdx = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  for (let i = startIdx; i < n; i++) {
    const [nx, ny] = positions[i];

    if (ny > cy + 2) break;
    if (vis[i]) continue;

    if (Math.abs(nx - cx) <= 2) {
      vis[i] = true;
      queue.push([nx, ny, dist + 1]);
    }
  }
}

console.log(-1);
