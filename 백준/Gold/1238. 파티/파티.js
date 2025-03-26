const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // a가 b보다 같거나 크니?
  compare(a, b) {
    return this.heap[a][1] <= this.heap[b][1];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      // 부모가 이미 작거나 같으면 바꿀 필요 없음.
      if (this.compare(parent, idx)) break;
      this.swap(parent, idx);

      idx = parent;
    }
  }

  top() {
    return this.heap[1];
  }

  empty() {
    return this.size === 0;
  }

  pop() {
    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild][1] < this.heap[leftChild][1]) {
        minChild = rightChild;
      }

      // idx 노드가 이미 작거나 같으면 바꿀 필요 없음.
      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }
}

/**
 * 우선 문제에서 1부터 N까지의 마을에 각각 한명의 학생이 살고 있다고 합니다..
 * 그리고 파티는 X번 마을에서 열린다고 하네요.. 우선 학생들이 게을러서 최단 거리만 이용한다니까 다익스트라를 쓰면 될 거 같아요.
 *
 * 먼저 주어진 간선들을 인접 리스트에 담아둡니다. [u, v, w]로 주어지죠? 시작점, 도착점, 가중치
 * 그리고 간선을 뒤집어서 따로 인접 리스트에 담아둬요. [v, u, w] 형태로요.
 *
 * 그리고 인접리스트를 사용해 X마을을 시작점으로 다익스트라 알고리즘을 수행한다면,
 * X마을에서 각 마을까지의 모든 경로를 담은 거리 테이블을 구할 수 있어요.
 *
 * 그 다음 간선을 뒤집은 인접리스트를 사용해 X마을을 시작점으로 다익스트라 알고리즘을 수행한다면,
 * X마을까지의 최단 경로를 담은 거리 테이블을 구할 수 있어요.
 *
 * 간선이 4개 있을 때
 * 1 => 2의 가중치 1
 * 1 => 3의 가중치 4
 * 2 => X의 가중치 6
 * 3 => X의 가중치 1
 *
 * 각 마을로부터 X까지의 최단경로는
 * 1번 마을은 1 => 3 => X로 5
 * 2번 마을은 2 => X로 6
 * 3번 마을은 3 => X로 1
 *
 * X => 3의 가중치 1
 * X => 2의 가중치 6
 * 3 => 1의 가중치 4
 * 2 => 1의 가중치 1
 *
 * X로부터 각 마을까지의 최단경로는
 * 3번마을은 X => 3으로 1
 * 2번마을은 X => 2로 6
 * 1번마을은 X => 3 => 1로 가중치 5로 뒤집어서 X를 시작점으로 모두 구해주면 됩니다.
 */

let idx = 0;
const [n, m, x] = input[idx++].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);

for (let i = 0; i < m; i++) {
  const [u, v, w] = input[idx++].split(' ').map(Number);

  // 시작점 u로부터 [도착노드v, 가중치w]
  adj[u].push([v, w]);
}

// 간선을 뒤집어 저장할 인접리스트
const revAdj = Array.from({length: n + 1}, () => []);
for (let i = 1; i <= n; i++) {
  for (const [v, w] of adj[i]) {
    revAdj[v].push([i, w]);
  }
}

const dist = Array(n + 1).fill(Infinity);
const revDist = Array(n + 1).fill(Infinity);

function dijkstra(d, adjacencyList) {
  const pq = new MinHeap();
  d[x] = 0;
  pq.push([x, d[x]]);

  while (!pq.empty()) {
    const [cur_idx, cur_dist] = pq.top();
    pq.pop();

    // 확정된 pq의 거리와 d테이블의 거리 값이 다르다면 잘못된 원소니 건너뛰기.
    if (d[cur_idx] !== cur_dist) continue;
    for (const [nxt_v, nxt_w] of adjacencyList[cur_idx]) {
      // 현재 저장된 거리 값이 현재 가중치보다 작으면 바꿀 필요가 없음.
      if (d[nxt_v] <= d[cur_idx] + nxt_w) continue;

      d[nxt_v] = d[cur_idx] + nxt_w;
      pq.push([nxt_v, d[nxt_v]]);
    }
  }
}

dijkstra(dist, adj);
dijkstra(revDist, revAdj);

let maxDist = -1;

for (let i = 1; i <= n; i++) {
  maxDist = Math.max(maxDist, dist[i] + revDist[i]);
}

console.log(maxDist);
