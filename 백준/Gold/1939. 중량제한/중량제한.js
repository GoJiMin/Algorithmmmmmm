const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

class MaxHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    return this.heap[a][1] <= this.heap[b][1];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      if (this.compare(idx, parent)) break;
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

      let maxChild = leftChild;
      if (rightChild <= this.size && this.heap[leftChild][1] < this.heap[rightChild][1]) {
        maxChild = rightChild;
      }

      if (this.compare(maxChild, idx)) break;
      this.swap(idx, maxChild);

      idx = maxChild;
    }
  }
}

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);

const adj = Array.from({length: n + 1}, () => []);

for (let i = 0; i < m; i++) {
  const [u, v, w] = input[idx++].split(' ').map(Number);

  adj[u].push([v, w]);
  adj[v].push([u, w]);
}

const [st, en] = input[idx].split(' ').map(Number);
const pq = new MaxHeap();
const w = Array(n + 1).fill(0);

w[st] = Infinity;
pq.push([st, w[st]]);

while (!pq.empty()) {
  const [cur_idx, cur_w] = pq.top();
  pq.pop();

  if (w[cur_idx] !== cur_w) continue;
  for (const [nxt_v, nxt_w] of adj[cur_idx]) {
    if (w[nxt_v] >= Math.min(nxt_w, w[cur_idx])) continue;
    w[nxt_v] = Math.min(nxt_w, w[cur_idx]);

    pq.push([nxt_v, w[nxt_v]]);
  }
}

console.log(w[en]);
