const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 일단 산봉우리의 정의를 살펴보자면,
 *
 * 같은 높이를 가지는 하나의 격자 혹은 인접한 격자들의 집합.
 * 산봉우리와 인접한 격자는 산봉우리의 높이보다 작아야 한다.
 *
 * 일단 풀어볼 아이디어인데, 넓이 우선 탐색으로 모든 산봉우리의 좌표를 담아두고,
 * 이 산봉우리 좌표들을 순회하면서 주변에 현재 산봉우리보다 높은 산봉우리가 있다면 버리고,
 * 이게 가장 높은 산봉우리이면 카운트 증가?
 */

const [n, m] = input[0].split(' ').map(Number);
const map = [];

for (let i = 1; i <= n; i++) map.push(input[i].split(' ').map(Number));

const vis = Array.from({length: n}, () => Array(m).fill(false));
const dirs = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const peaks = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (vis[i][j] || !map[i][j]) continue;
    vis[i][j] = true;
    findPeak(i, j);
  }
}

function findPeak(x, y) {
  const cur = map[x][y];

  const queue = [[x, y]];
  const peak = [];

  let head = 0;
  while (queue.length > head) {
    const [x, y] = queue[head++];
    peak.push([x, y]);

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m || vis[nx][ny]) continue;
      if (map[nx][ny] === cur) {
        queue.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }
  }

  peaks.push(peak);
}

let result = 0;
for (let p = 0; p < peaks.length; p++) {
  const peak = peaks[p];

  if (check(peak)) {
    result++;
  }
}

function check(peak) {
  for (const [x, y] of peak) {
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (map[x][y] < map[nx][ny]) return false;
    }
  }

  return true;
}

console.log(result);
