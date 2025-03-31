const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(x) {
    const node = new Node(x);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  pop() {
    if (!this.head) return;

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    return data;
  }

  empty() {
    return this.length === 0;
  }
}

const n = Number(input);

const queue = new Queue();
const dist = Array.from({length: 1_000_001}, () => [-1, -1]);

dist[0] = [0, 0];
// [일수, 물의 양, 길이]
queue.push([0, 0, 0]);

while (!queue.empty()) {
  const [d, w, l] = queue.pop();

  for (const [nw, nl] of [
    [w + 1, l + 1],
    [w + 3, l * 3],
    [w + 5, l ** 2],
  ]) {
    if (nl > n) continue;

    const nxtD = d + 1;
    if (dist[nl][0] === -1) {
      dist[nl] = [nxtD, nw];
      queue.push([nxtD, nw, nl]);
    } else if (dist[nl][0] === nxtD && dist[nl][1] > nw) {
      dist[nl] = [nxtD, nw];
      queue.push([nxtD, nw, nl]);
    }
  }
}

console.log(dist[n][0], dist[n][1]);
