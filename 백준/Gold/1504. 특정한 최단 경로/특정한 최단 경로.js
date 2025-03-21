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

  // a보다 b가 큰가?
  compare(a, b) {
    return this.heap[a][0] <= this.heap[b][0];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      // 이미 부모가 더 작다면 바꿀 필요가 없다.
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
      if (rightChild <= this.size && this.heap[rightChild][0] < this.heap[leftChild][0]) {
        minChild = rightChild;
      }

      // 이미 idx가 minChild보다 작다면 바꿀 필요가 없다.
      if (this.compare(idx, minChild)) break;

      this.swap(minChild, idx);
      idx = minChild;
    }
  }
}

let idx = 0;
const [n, e] = input[idx++].split(' ').map(Number); // n = 정점의 수, e = 간선의 수
const adj = Array.from({length: n + 1}, () => []);

for (let i = 0; i < e; i++) {
  // u = 출발점, v = 도착점, w = 가중치
  const [u, v, w] = input[idx++].split(' ').map(Number);

  // 양방향 그래프 [가중치, 도착점]
  adj[u].push([w, v]);
  adj[v].push([w, u]);
}

const [v1, v2] = input[idx].split(' ').map(Number);

/**
 * 우선 1번 정점에서 N번 정점까지 이동하는 경로 중 v1, v2를 무조건 거쳐야 합니다.
 *
 * 그럼 거칠 수 있는 경우의 수를 생각해봅시다..
 * 1번에서 v1, v1에서 v2, v2에서 n
 * 1번에서 v2, v2에서 v1, v1에서 n
 * 으로 생각하면 될 거 같은데요..? 어차피 두 정점을 지나는 최단 경로를 찾으라니까 못 찾으면 Inf니까 분기처리하고..
 */

function dijkstra(st, en) {
  const pq = new MinHeap();
  const d = Array(n + 1).fill(Infinity);

  d[st] = 0;
  pq.push([d[st], st]);

  while (!pq.empty()) {
    const [c_d, c_i] = pq.top();
    pq.pop();

    // 확정된 거리(우선순위 큐에 들어간 거리)와 거리 테이블의 값이 다르면 건너뛰기 => 잘못된 경로니까
    if (d[c_i] !== c_d) continue;
    for (const [n_d, n_i] of adj[c_i]) {
      // 현재 저장된 다음 경로가 현재 경로에 가중치를 더한 값보다 작다면 건너뛰기
      if (d[n_i] <= d[c_i] + n_d) continue;

      d[n_i] = d[c_i] + n_d;
      pq.push([d[n_i], n_i]);
    }
  }

  return d[en];
}

const ans1 = dijkstra(1, v1) + dijkstra(v1, v2) + dijkstra(v2, n);
const ans2 = dijkstra(1, v2) + dijkstra(v2, v1) + dijkstra(v1, n);

const result = Math.min(ans1, ans2);

console.log(result === Infinity ? -1 : result);
