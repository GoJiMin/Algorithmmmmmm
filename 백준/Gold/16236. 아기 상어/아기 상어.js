const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 음.. 스펙부터 적어봅시다..
 *
 * 아기 상어가 이동할 경로를 결정하는 방법
 * - 상, 하, 좌, 우로 이동이 가능하다.
 * - 각 칸은 물고기의 크기가 나타나있으며, 본인보다 작은 물고기만 먹을 수 있다. 같을 경우 이동만 가능.
 * - 더 이상 먹을 수 있는 물고기가 없다면 엄마 상어에게 도움을 요청 => 종료.
 * - 먹을 수 있는 물고기가 1마리면, 그 물고기를 먹으러 이동.
 * - 1마리 이상일 경우 거리가 가장 물고기를 먹으러 이동. => 거리는 지나야 하는 칸의 최솟값.
 * - 거리가 가까운 물고기가 많으면, 가장 위, 위에도 많으면 가장 왼쪽.
 *
 * - 물고기를 먹는 시간은 고려 안 함. => 이동과 동시에 먹음.
 * - 물고기를 먹으면 해당 칸은 빈 칸 처리.
 * - 자신의 크기와 같은 수의 물고기를 먹을 때마다 크기가 1증가 => 크기가 2라면, 물고기를 2마리 먹어야 1증가.
 *
 * 구현 순서
 * 1. 상, 하, 좌, 우로 이동
 */

const n = Number(input[0]);
const map = [];

for (let i = 1; i <= n; i++) map.push(input[i].split(" ").map(Number));

const directions = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
];

const initXY = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 9) {
      initXY.push(i, j);
    }
  }
}

function scan(level, curX, curY) {
  const dist = Array.from({ length: n }, () => Array(n).fill(-1));

  const queue = [[curX, curY]];
  dist[curX][curY] = 0;

  const candidate = {
    directionX: null,
    directionY: null,
    dist: null,
  };

  function update(nx, ny, curDist) {
    candidate.directionX = nx;
    candidate.directionY = ny;
    candidate.dist = curDist;
  }

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + directions[dir][0];
      const ny = y + directions[dir][1];

      if (
        nx < 0 ||
        nx >= n ||
        ny < 0 ||
        ny >= n ||
        map[nx][ny] > level ||
        dist[nx][ny] !== -1
      )
        continue;
      if (map[nx][ny] !== 0 && map[nx][ny] < level) {
        const curDist = dist[x][y] + 1;

        if (!candidate.dist) {
          update(nx, ny, curDist);
        } else if (curDist < candidate.dist) {
          update(nx, ny, curDist);
        } else if (curDist === candidate.dist) {
          // 1. 거리가 같으면, 가장 위
          if (nx < candidate.directionX) {
            update(nx, ny, curDist);
            continue;
            // 2. 모두 위에 있다면, 가장 왼쪽
          } else if (nx === candidate.directionX && ny < candidate.directionY) {
            update(nx, ny, curDist);
            continue;
          }
        }
      }

      queue.push([nx, ny]);
      dist[nx][ny] = dist[x][y] + 1;
    }
  }

  return candidate;
}

let cnt = 0;
let level = 2;

let exp = 0;
while (true) {
  const [x, y] = initXY;
  map[x][y] = 0;

  const result = scan(level, x, y);

  if (!result.dist) break;

  const { directionX, directionY, dist } = result;

  cnt += dist;
  exp++;

  if (level === exp) {
    level++;
    exp = 0;
  }

  [initXY[0], initXY[1]] = [directionX, directionY];
}

console.log(cnt);
