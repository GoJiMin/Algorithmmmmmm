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

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      if (this.heap[parent] <= this.heap[idx]) break;
      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];

      idx = parent;
    }
  }

  top() {
    return !this.size ? 0 : this.heap[1];
  }

  pop() {
    if (!this.size) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild] < this.heap[leftChild]) {
        minChild = rightChild;
      }

      if (this.heap[idx] <= this.heap[minChild]) break;

      [this.heap[idx], this.heap[minChild]] = [this.heap[minChild], this.heap[idx]];

      idx = minChild;
    }
  }
}

const [n, m] = input[0].split(' ').map(Number);
const pq = new MinHeap();

const arr = input[1].split(' ').map(BigInt);
for (let i = 0; i < n; i++) {
  pq.push(arr[i]);
}

for (let i = 0; i < m; i++) {
  // 카드 한 장 뽑기.
  const min1 = pq.top();
  pq.pop();

  // 카드 한 장 더 뽑기.
  const min2 = pq.top();
  pq.pop();

  // 2장 뽑은 거 합쳐서 다시 넣기.
  const sum = min1 + min2;
  pq.push(sum);
  pq.push(sum);
}

let result = 0n;
for (let i = 0; i < n; i++) {
  result += pq.top();
  pq.pop();
}

console.log(result.toString());
