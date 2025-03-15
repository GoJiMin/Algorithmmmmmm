const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

class MinHeap {
  constructor(MX) {
    this.heap = Array(MX);
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  // 절댓값 a, b 비교 => 같으면 정수 a, b 비교
  compare(a, b) {
    const absA = Math.abs(this.heap[a]);
    const absB = Math.abs(this.heap[b]);

    if (absA === absB) {
      return this.heap[a] < this.heap[b];
    }

    return absA < absB;
  }

  /**
   * [X, -4]인 힙에 3를 넣으면 [X, -4, 3] => 절댓값은 3이 더 작으니 1번지와 자리를 바꿔야 함.
   *
   * 현재 부모와 마지막에 들어간 요소를 compare 함수로 비교함. 부모가 더 작다면 바꿀 필요가 없음.
   */
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

  pop() {
    if (!this.size) return;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = 2 * idx;
      const rightChild = 2 * idx + 1;

      let minChild = leftChild;
      // 리프 노드가 아니고, 오른쪽 노드가 더 작으면 minChild 갱신
      if (rightChild <= this.size && this.compare(rightChild, leftChild)) {
        minChild = rightChild;
      }

      if (this.compare(idx, minChild)) break;
      this.swap(idx, minChild);

      idx = minChild;
    }
  }
}

const n = Number(input[0]);
const heap = new MinHeap(100_005);

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
