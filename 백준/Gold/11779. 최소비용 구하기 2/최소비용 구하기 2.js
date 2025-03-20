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

  compare(a, b) {
    return this.heap[a][0] <= this.heap[b][0];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      // 부모가 더 작으면 바꿀 필요 없음.
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

      // 부모가 더 작으면 바꿀 필요 없음 idx가 부모임.
      if (this.compare(idx, minChild)) break;
      this.swap(minChild, idx);
      idx = minChild;
    }
  }
}

let idx = 0;
const n = Number(input[idx++]); // 도시의 개수 => 정점의 수
const m = Number(input[idx++]); // 버스의 개수 => 간선의 수

const adj = Array.from({length: n + 1}, () => []);
for (let i = 0; i < m; i++) {
  // u = 시작점, v = 도착점, w = 가중치
  const [u, v, w] = input[idx++].split(' ').map(Number);

  adj[u].push([v, w]);
}

const d = Array(1005).fill(Infinity); // 최단 거리 테이블
const pre = Array(1005); // 경로 복원용

const [st, en] = input[idx++].split(' ').map(Number);
const pq = new MinHeap();

d[st] = 0;
// [현재거리, 시작점]
pq.push([d[st], st]);

while (!pq.empty()) {
  const [c_d, c_i] = pq.top();
  pq.pop();

  // 우선순위 큐에는 확정된 [거리, 정점]이 들어감. 거리 테이블과 확정된 거리 값이 다르다면 잘못된 경로니 무시.
  if (d[c_i] !== c_d) continue;

  // n_v = 도착점, n_w = 가중치
  for (const [n_v, n_w] of adj[c_i]) {
    // 도착점 n_v에 해당하는 거리 테이블 값이 (현재 정점 c_i까지 확정된 거리) + (가중치 n_w) 보다 작다면 갱신 필요 없음.
    if (d[n_v] <= d[c_i] + n_w) continue;

    d[n_v] = d[c_i] + n_w;
    pre[n_v] = c_i;

    pq.push([d[n_v], n_v]);
  }
}

const path = [];

let cur = en;
while (cur !== st) {
  path.push(cur);
  cur = pre[cur];
}

path.push(cur);

console.log(d[en] + '\n' + path.length + '\n' + path.reverse().join(' '));
