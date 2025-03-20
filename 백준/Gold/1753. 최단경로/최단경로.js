const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 우선순위 큐를 이용한 다익스트라 알고리즘 구현
 */
class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    return this.heap[a][0] <= this.heap[b][0];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      if (this.compare(parent, idx)) break;
      this.swap(parent, idx);

      idx = parent;
    }
  }

  top() {
    return !this.size ? 0 : this.heap[1];
  }

  empty() {
    return this.size === 0;
  }

  pop() {
    if (!this.size) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild][0] < this.heap[leftChild][0]) {
        minChild = rightChild;
      }

      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }
}

let idx = 0;
// v = 정점의 수, e = 간선의 수
const [v, e] = input[idx++].split(' ').map(Number);
const st = Number(input[idx++]);

const adj = Array.from({length: v + 1}, () => []);

for (let i = 0; i < e; i++) {
  const [u, v, w] = input[idx++].split(' ').map(Number);

  adj[u].push([w, v]);
}

// 최단 거리 테이블 d[i]는 시작점부터 정점 i까지의 최단 거리
const d = Array(20005).fill(Infinity);
const pq = new MinHeap();

d[st] = 0;
pq.push([d[st], st]); // [시작 거리 = 0, 시작점]

while (!pq.empty()) {
  const [cur_dist, cur_idx] = pq.top();
  pq.pop();

  // 현재 테이블에 저장된 거리 값(d[cur_idx]이 4인데, 우선순위 큐에서 꺼낸 cur_dist 값이 5라면 잘못된 원소니 건너뛰기.
  if (d[cur_idx] !== cur_dist) continue;
  for (const [nxt_w, nxt_v] of adj[cur_idx]) {
    /**
     * 만약 거리 테이블에 d[nxt_v] 값이 d[cur_idx]에 nxt_v의 가중치를 더한 값보다 작으면 넘어가기
     * 즉 이미 구해놓은 최단 거리가 있고 더 작으면 그냥 넘어가기
     */
    if (d[nxt_v] <= d[cur_idx] + nxt_w) continue;
    d[nxt_v] = d[cur_idx] + nxt_w;
    pq.push([d[nxt_v], nxt_v]);
  }
}

const result = [];
for (let i = 1; i <= v; i++) {
  if (d[i] === Infinity) result.push('INF'); // 값이 그대로면 갈 수 없는 곳임.
  else result.push(d[i]);
}

console.log(result.join('\n'));
