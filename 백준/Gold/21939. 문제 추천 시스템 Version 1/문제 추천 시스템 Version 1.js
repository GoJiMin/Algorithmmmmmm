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
    if (this.heap[a][1] === this.heap[b][1]) {
      return this.heap[a][0] <= this.heap[b][0];
    } else {
      return this.heap[a][1] <= this.heap[b][1];
    }
  }

  compareMinChild(a, b) {
    if (this.heap[a][1] === this.heap[b][1]) {
      return this.heap[a][0] < this.heap[b][0];
    } else {
      return this.heap[a][1] < this.heap[b][1];
    }
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
    if (!this.size) return null;

    return this.heap[1];
  }

  pop() {
    if (!this.size) return null;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let minChild = leftChild;
      if (rightChild <= this.size && this.compareMinChild(rightChild, leftChild)) {
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
    this.heap = [];
    this.size = 0;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  compare(a, b) {
    if (this.heap[b][1] === this.heap[a][1]) {
      return this.heap[b][0] <= this.heap[a][0];
    } else {
      return this.heap[b][1] <= this.heap[a][1];
    }
  }

  compareMaxChild(a, b) {
    if (this.heap[b][1] === this.heap[a][1]) {
      return this.heap[b][0] < this.heap[a][0];
    } else {
      return this.heap[b][1] < this.heap[a][1];
    }
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
    if (!this.size) return null;

    return this.heap[1];
  }

  pop() {
    if (!this.size) return null;

    this.heap[1] = this.heap[this.size--];

    let idx = 1;
    while (idx * 2 <= this.size) {
      const leftChild = idx * 2;
      const rightChild = idx * 2 + 1;

      let maxChild = leftChild;
      if (rightChild <= this.size && this.compareMaxChild(rightChild, leftChild)) {
        maxChild = rightChild;
      }

      if (this.compare(idx, maxChild)) break;
      this.swap(idx, maxChild);

      idx = maxChild;
    }
  }
}

let idx = 0;
const n = Number(input[idx++]);

const listMap = new Map();
const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

function addProblem(p, l) {
  listMap.set(p, l);

  minHeap.push([p, l]);
  maxHeap.push([p, l]);
}

/**
 * 만약 힙의 top을 조회했는데, listMap에 없는 문제라면?
 * 이 문제는 이미 해결되어 제거된 문제이므로.. 존재하면 안되는 문제임.
 * 그러므로 힙의 top이 listMap에 존재할 때까지 pop하면 될듯?
 *
 * solved가 된 이후 동일한 문제가 들어온 case 발견..
 *
 * 그럼 listMap에 p-l 형태로 저장하고, 저장된 문제와 난이도가 일치하지 않을 경우도 정상적이지 않다고 판단해야할듯..
 */

function recommendProblem(type) {
  if (type === '1') {
    while (true) {
      const [heapP, heapL] = maxHeap.top();

      if (listMap.has(heapP) && listMap.get(heapP) === heapL) break;
      maxHeap.pop();
    }

    return maxHeap.top()[0];
  } else {
    while (true) {
      const [heapP, heapL] = minHeap.top();

      if (listMap.has(heapP) && listMap.get(heapP) === heapL) break;
      minHeap.pop();
    }

    return minHeap.top()[0];
  }
}

for (let i = 0; i < n; i++) {
  const [p, l] = input[idx++].split(' ').map(Number);

  addProblem(p, l);
}

let m = Number(input[idx++]);

const result = [];
for (let i = 0; i < m; i++) {
  const commands = input[idx++].trim().split(' ');

  switch (commands[0]) {
    case 'add':
      const p = Number(commands[1]);
      const l = Number(commands[2]);

      addProblem(p, l);
      break;
    case 'recommend':
      const number = recommendProblem(commands[1]);

      result.push(number);
      break;
    case 'solved':
      listMap.delete(Number(commands[1]));
      break;
  }
}

console.log(result.join('\n'));