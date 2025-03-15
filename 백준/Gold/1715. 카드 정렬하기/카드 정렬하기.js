const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 힙이라는 자료구조를 공부하고 다시 이 문제를 풀어보려고 왔더니..
 * 어떻게 풀어야할지 감이 좀 잡힌다고 할까요? 원래 이거 힙 공부 안 하고 그냥 머리 박아서 풀어보려고 했었는데요..
 *
 * 결국에 못 풀고 포기했었거든요.
 * 근데 보니까 10, 20, 40장의 묶음이 있을 때, 먼저 10, 20, 40장을 모두 최소힙에 넣어버립니다.
 * 그리고 이제 힙의 size가 0이 될 때까지 top을 조회 및 pop해서 더하고, 바로 push하면 되잖아요?
 *
 *      10     =>    top 확인 10, pop =>       20      => top 확인 20, pop     =>      40
 *   20   40                               40              10, 20 더하기
 *
 *    더한 30을 다시 push   =>     30    => 마찬가지로 빌 때까지 pop => 30 + 40 => 70, 최종 100
 *                             40
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

  length() {
    return this.size;
  }

  pop() {
    const data = this.heap[1];

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

    return data;
  }
}

const n = Number(input[0]);
const heap = new MinHeap();

for (let i = 1; i <= n; i++) {
  heap.push(Number(input[i]));
}

let total = 0;

// 힙에 요소가 최소 2개 이상일 때까지만 돌리기
while (heap.length() >= 2) {
  const card1 = heap.pop(); // 최솟값 1
  const card2 = heap.pop(); // 최솟값 2

  const sum = card1 + card2;

  total += sum;
  heap.push(sum); // 더한 값 다시 넣어놓기
}

console.log(total);
