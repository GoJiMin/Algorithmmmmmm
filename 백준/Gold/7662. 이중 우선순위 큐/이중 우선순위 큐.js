const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

class MinHeap {
  constructor() {
    this.heap = Array(1_000_001);
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    return this.heap[a] <= this.heap[b];
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      if (this.compare(parent, idx)) break;
      this.swap(idx, parent);

      idx = parent;
    }
  }

  top() {
    return this.size > 0 && this.heap[1];
  }

  pop() {
    if (this.size === 0) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.heap[rightChild] < this.heap[leftChild]) {
        minChild = rightChild;
      }

      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }
}

class MaxHeap {
  constructor() {
    this.heap = Array(1_000_001);
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    return this.heap[b] <= this.heap[a];
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
    return this.size > 0 && this.heap[1];
  }

  pop() {
    if (this.size === 0) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let maxChild = leftChild;
      if (rightChild <= this.size && this.heap[leftChild] < this.heap[rightChild]) {
        maxChild = rightChild;
      }

      if (this.compare(idx, maxChild)) break;
      this.swap(idx, maxChild);

      idx = maxChild;
    }
  }
}

let idx = 0;
const t = Number(input[idx++]);

for (let i = 0; i < t; i++) {
  const q = Number(input[idx++]);

  const minHeap = new MinHeap();
  const maxHeap = new MaxHeap();

  const cntMap = new Map();

  for (let j = 0; j < q; j++) {
    const line = input[idx++].trim().split(' ');

    const command = line[0];
    const x = Number(line[1]);

    if (command === 'I') {
      minHeap.push(x);
      maxHeap.push(x);

      cntMap.set(x, (cntMap.get(x) || 0) + 1);
    } else {
      if (x === 1) {
        while (cntMap.size > 0 && !cntMap.has(maxHeap.top())) {
          maxHeap.pop();
        }

        const max = maxHeap.top();
        if (cntMap.has(max)) cntMap.set(max, cntMap.get(max) - 1);
        if (cntMap.get(max) === 0) cntMap.delete(max);

        maxHeap.pop();
      } else {
        while (cntMap.size > 0 && !cntMap.has(minHeap.top())) {
          minHeap.pop();
        }

        const min = minHeap.top();
        if (cntMap.has(min)) cntMap.set(min, cntMap.get(min) - 1);
        if (cntMap.get(min) === 0) cntMap.delete(min);

        minHeap.pop();
      }
    }
  }

  let max = Number.MIN_SAFE_INTEGER;
  let min = Number.MAX_SAFE_INTEGER;
  for (const key of cntMap.keys()) {
    max = Math.max(max, key);
    min = Math.min(min, key);
  }

  if (cntMap.size > 0) {
    console.log(max, min);
  } else {
    console.log('EMPTY');
  }
}
