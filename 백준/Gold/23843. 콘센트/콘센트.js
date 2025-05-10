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
    return this.heap[a] <= this.heap[b];
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
    return this.heap[1];
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
      if (rightChild <= this.size && this.heap[rightChild] < this.heap[leftChild]) {
        minChild = rightChild;
      }

      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }
}

/**
 * 처음엔 m개만큼 콘센트가 비어있음..
 *
 * 그럼 m개만큼 우선순위 큐(구현체는 최소힙)에 현재까지 충전에 걸린 시간을 넣어놓음.. => 0초겠지?
 *
 * 5 2
 * 1 4 4 8 1의 경우라면.. [0, 0]..
 *
 * 당연히 오래 걸리는 것부터 콘센트에 끼운다.. 정렬하면 되겠지..?
 * 8 4 4 1 1
 *
 * 그럼.. [0, 8]..
 * 그 다음 턴에 [4, 8]..
 * 그 다음 턴데 [8, 8]..
 * 마지막엔 [8, 9]..
 *
 * 그럼 마지막에 큐가 빌 때까지 전부 빼내면서 최대값을 찾으면 될듯..
 */

const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

arr.sort((a, b) => b - a);

const pq = new MinHeap();
for (let i = 0; i < m; i++) {
  pq.push(0);
}

for (let i = 0; i < n; i++) {
  const earliest = pq.top();
  pq.pop();

  pq.push(earliest + arr[i]);
}

let ans = 0;
while (!pq.empty()) {
  ans = Math.max(ans, pq.top());
  pq.pop();
}

console.log(ans);
