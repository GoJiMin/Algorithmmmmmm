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

  compare(a, b) {
    return this.heap[a][1] <= this.heap[b][1];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
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

  pop() {
    if (this.size === 0) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild][1] < this.heap[leftChild][1]) {
        minChild = rightChild;
      }

      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }

  top() {
    return this.heap[1];
  }

  empty() {
    return this.size === 0;
  }
}

let idx = 0;
const t = Number(input[idx++]);

const result = [];
for (let i = 0; i < t; i++) {
  const [n, d, c] = input[idx++].split(' ').map(Number);

  const adj = Array.from({length: n + 1}, () => []);

  for (let i = 0; i < d; i++) {
    // [a, b, s]가 주어지는데.. b가 감염되면 s초 후 a가 감염된다..
    // 그럼 간선은 b => a..
    const [v, u, w] = input[idx++].split(' ').map(Number);

    adj[u].push([v, w]);
  }

  const dist = Array(n + 1).fill(Infinity);
  const pq = new MinHeap();

  // 처음 감염된 컴퓨터 c..
  dist[c] = 0;

  pq.push([c, dist[c]]);

  while (!pq.empty()) {
    const [curI, curD] = pq.top();

    pq.pop();

    // 저장된 거리값과 우선순위 큐에서 꺼낸 값이 다르면 잘못된 원소..
    if (curD !== dist[curI]) continue;

    for (const [nxt_v, nxt_w] of adj[curI]) {
      // 이미 구해놓은 최단거리 값이 더 작으면 넘어가기..
      if (dist[nxt_v] <= dist[curI] + nxt_w) continue;

      dist[nxt_v] = dist[curI] + nxt_w;

      pq.push([nxt_v, dist[nxt_v]]);
    }
  }

  let cnt = 0;
  let time = 0;

  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) continue;

    cnt++;
    time = Math.max(time, dist[i]);
  }

  result.push(`${cnt} ${time}`);
}

console.log(result.join('\n'));
