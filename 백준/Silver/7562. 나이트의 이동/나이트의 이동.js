const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

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

  push(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
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

const t = input.shift();
const queue = new Queue();

for (let i = 0; i < +t; i++) {
  const I = ~~input.shift();

  const dist = Array.from(Array(I), () => Array(I).fill(0));

  const [curX, curY] = input.shift().split(" ").map(Number);
  const [targetX, targetY] = input.shift().split(" ").map(Number);

  queue.push([curX, curY]);

  let minDist = Infinity;
  while (!queue.empty()) {
    const [x, y] = queue.pop();

    if (x === targetX && y === targetY) {
      minDist = 0;
      break;
    }

    for (let act of [
      [x + 2, y + 1],
      [x + 1, y + 2],
      [x - 1, y + 2],
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x - 1, y - 2],
      [x + 1, y - 2],
      [x + 2, y - 1],
    ]) {
      const [nx, ny] = act;

      if (nx < 0 || nx >= I || ny < 0 || ny >= I) continue;
      if (nx === targetX && ny === targetY) {
        minDist = Math.min(minDist, dist[x][y] + 1);
        break;
      }
      if (dist[nx][ny] === 0) {
        queue.push([nx, ny]);
        dist[nx][ny] = dist[x][y] + 1;
      }
    }
  }

  console.log(minDist);
}
