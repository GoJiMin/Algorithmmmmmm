const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 기존에는 n * m 격자에서 토마토가 전염됐다면.. 이 문제는 h만큼의 높이도 가지는데요..
 *
 * 기존에는 [x, y]에 대한 상, 하, 좌, 우를 확인했다면, 이제 [z, x, y]에 대해 z + 1, z - 1도 확인하면 됩니다..
 *
 * 언제나처럼 연결리스트 큐 대신 사짜 큐를 이용합시다..
 */

let idx = 0;
const [m, n, h] = input[idx++].split(' ').map(Number);

const graph = [];

for (let i = 0; i < h; i++) {
  const line = [];
  for (let j = 0; j < n; j++) line.push(input[idx++].trim().split(' '));

  graph.push(line);
}

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
const dz = [1, -1];

const queue = [];
const dist = Array.from({length: h}, () => Array.from({length: n}, () => Array(m).fill(-1)));

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      // 벽이면 미리 거리 배열 0으로 초기화
      if (graph[i][j][k] === '-1') {
        dist[i][j][k] = 0;
      } else if (graph[i][j][k] === '1') {
        // 틈메이러면 큐에 넣고 거리 0으로 초기화
        queue.push([i, j, k]);
        dist[i][j][k] = 0;
      }
    }
  }
}

let head = 0;
while (head !== queue.length) {
  const [z, x, y] = queue[head++];

  // 먼저 위 아래부터 확인합시다.
  for (let dir = 0; dir < 2; dir++) {
    const nz = z + dz[dir];

    // 지하실로 넘어가거나 천국 가면 패스..
    if (nz < 0 || nz >= h) continue;
    if (dist[nz][x][y] === -1) {
      queue.push([nz, x, y]);
      dist[nz][x][y] = dist[z][x][y] + 1;
    }
  }

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (dist[z][nx][ny] === -1) {
      queue.push([z, nx, ny]);
      dist[z][nx][ny] = dist[z][x][y] + 1;
    }
  }
}

let max = 0;
for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      // 벽에 가로막히거나 했으면 -1이 존재할테니 -1 출력하고 조옹료
      if (dist[i][j][k] === -1) {
        console.log(-1);
        process.exit(0);
      }

      max = Math.max(max, dist[i][j][k]);
    }
  }
}

/**
 * 지금 3중 for문 2번 돌아가고 BFS까지 돌아갔는데 시간 제한 1초 괜찮냐구요?
 *
 * 일반적으로 BFS의 시간복잡도는 O(V + E)인데요..
 *
 * V는 정점의 수니까 토마토 상자에 있는 모든 칸 수를 구하면 되겠죠..? H * N * M = V
 * => 100 * 100 * 100 => 1_000_000
 *
 * E는 간선의 수로 각 토마토 칸에서 이동 가능한 방향입니다.. 이거 3차원 배열이니까 위, 아래, 상, 하, 좌, 우니까 6방향이죠..?
 * 그럼 간선의 수는 정점 수의 6배입니다..
 *
 * 그럼 O(V + E)는 O(V + 6V)는 O(7V)인데 빅오는 상수 무시하니까 O(V).. 그럼 O(H * N * M)이네요..
 *
 * 그러면 3중 for문은 1_000_000번..
 * BFS는 각 칸마다 최대 한 번에 6방향 확인이니 6_000_000번..
 * 마지막 3중 for문 1_000_000번..
 *
 * 그럼 최악의 케이스에서 8_000_000번.. 보통 러프하게 1억번 연산하면 1초 나온다고 많이들 말하니까 추웅분하네요..
 */
console.log(max);
