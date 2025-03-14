const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 최소힙 구현해봤는데요.. 최대힙은 반대로 구현하면 될 거 같아요.
 *
 * pop에서 right가 리프노드인 것을 체크해면서 비교 후 스왑해줍시다.
 */
class MaxHeap {
  constructor(MX) {
    this.heap = Array(MX);
    this.size = 0;
  }

  push(x) {
    this.heap[++this.size] = x;

    let idx = this.size;
    while (idx !== 1) {
      const parent = Math.floor(idx / 2);

      if (this.heap[idx] <= this.heap[parent]) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];

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

      let maxChild = leftChild;
      if (rightChild <= this.size && this.heap[leftChild] < this.heap[rightChild]) {
        maxChild = rightChild;
      }

      if (this.heap[maxChild] <= this.heap[idx]) break;
      [this.heap[maxChild], this.heap[idx]] = [this.heap[idx], this.heap[maxChild]];

      idx = maxChild;
    }
  }
}

const n = Number(input[0]);
const heap = new MaxHeap(13);

const result = [];
for (let i = 1; i <= n; i++) {
  const op = Number(input[i]);

  if (op === 0) {
    result.push(heap.top());
    heap.pop();
  } else {
    heap.push(op);
  }
}

console.log(result.join('\n'));
