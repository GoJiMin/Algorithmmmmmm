const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음.. 일단 굉장히 까다로워보이는 문제..
 *
 * 요점만 보자면.. 섬이 여러개 있을 때, 섬과 섬을 연결하는 다리를 놓을 수 있고..
 * 문제는 이 다리 중 가장 짧은 다리의 길이를 원한다..
 *
 * 섬의 영역은 1..
 *
 * 문제는 서로 다른 섬이라는걸 알 수 있어야 함..
 *
 * 1만으로는 서로 다른 섬이라는걸 알 수 없을 거 같으니 먼저 각 섬을 다른 이름으로 정해줘야 하나..?
 *
 * 예를 들자면,
 * 1 1 0 0 1 1
 * 1 0 0 0 1 1
 * 0 0 0 0 0 0
 * 0 0 1 0 0 0
 * 0 0 1 1 1 0
 * 이라는 섬이 있다면
 *
 * 1 1 0 0 2 2
 * 1 0 0 0 2 2
 * 0 0 0 0 0 0
 * 0 0 3 0 0 0
 * 0 0 3 3 3 0
 * 으로..? 그럼 각 섬마다 고유한 아이디가 있으니 각 섬의 좌표를 모두 넣고 bfs를 싹 돌려서 다른 아이디의 섬을 만나는
 * 가장 짧은 거리를 구하면 되지 않나?
 *
 * 일단 문제는 그럼 이 섬의 아이디를 고유하게 어떻게 붙일지.. 이것도 bfs..?
 */

const n = Number(input[0]);
const map = [];

for (let i = 1; i <= n; i++) map.push(input[i].trim().split(' '));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

function isOutOfRange(x, y) {
  return x < 0 || x >= n || y < 0 || y >= n;
}

function setIslandId(x, y, currentId) {
  const queue = [[x, y]];
  let head = 0;

  while (queue.length > head) {
    const [x, y] = queue[head++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (isOutOfRange(nx, ny)) continue;
      if (map[nx][ny] === '1') {
        map[nx][ny] = currentId;
        queue.push([nx, ny]);
      }
    }
  }
}

// 전부 1이니까 일단 2, 3, 4로..?
let islandId = 2;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === '1') {
      map[i][j] = islandId;
      // 어차피 각 영역마다 bfs가 돌아가니 다른 영역은 결국 다른 id로 초기화될것..
      setIslandId(i, j, islandId);
      islandId++; // 다른 섬은 이제 다른 아이디로 변경
    }
  }
}

/**
 * 여기까지 하면 이제 각 섬마다 고유한 ID가 들어옴..
 *
 * 그럼 각 섬의 좌표를 모두 큐에 넣어놓고, 다른 섬을 만나는 가장 최단거리를 업데이트한다면?
 *
 * 어차피 같은 섬에 대한 bfs는 돌아가지 않을테니 알아서 외곽 지역인 0에 대한 bfs만 돌아갈듯?
 */

// 각 섬은 2부터 시작하고 islandId는 마지막에 1이 증가하니 -1로..
let minBridge = Infinity;
for (let id = 2; id < islandId - 1; id++) {
  const queue = [];
  const dist = Array.from({length: n}, () => Array(n).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 현재 고유 id에 해당하는 섬의 좌표를 모두 큐에 넣고 거리 배열 초기화
      if (map[i][j] === id) {
        queue.push([i, j]);
        dist[i][j] = 0;
      }
    }
  }

  let head = 0;
  while (queue.length > head) {
    const [x, y] = queue[head++];

    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;

      if (isOutOfRange(nx, ny)) continue;
      // 바다가 아닌, 다른 섬을 만난다면 즉시 종료
      if (map[nx][ny] !== '0' && map[nx][ny] !== id) {
        minBridge = Math.min(minBridge, dist[x][y]);
        break;
      }

      // 아직 방문 안 했다면
      if (dist[nx][ny] === -1) {
        queue.push([nx, ny]);
        dist[nx][ny] = dist[x][y] + 1;
      }
    }
  }
}

console.log(minBridge);
