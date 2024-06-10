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

const [mnk, ...arr] = input;
const [m, n, k] = mnk.split(" ").map(Number);
const loc = arr.map((el) => el.trim().split(" "));

const vis = Array.from(Array(m), () => Array(n).fill(-1));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = new Queue();

for (let i = 0; i < k; i++) {
  const [x1, y1, x2, y2] = loc[i].map(Number);

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      vis[m - y - 1][x] = 0;
    }
  }
}

let cnt = 0;
const result = [];

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (vis[i][j] === -1) {
      queue.push([i, j]);
      vis[i][j] = 0;
      cnt++;

      let size = 1;
      while (!queue.empty()) {
        const [y, x] = queue.pop();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          if (vis[ny][nx] > -1) continue;

          vis[ny][nx] = 0;
          size++;
          queue.push([ny, nx]);
        }
      }

      result.push(size);
    }
  }
}

console.log(cnt + "\n" + result.sort((a, b) => a - b).join(" "));
