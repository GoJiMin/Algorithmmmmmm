const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

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

const [n, m] = nm.split(" ").map(Number);
const box = arr.map((el) => el.trim().split(" "));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = new Queue();
const dist = Array.from(Array(m), () => Array(n).fill(0));

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (box[i][j] === "1") {
      queue.push([i, j]);
      dist[i][j] = 0;
    }
    if (box[i][j] === "0") {
      dist[i][j] = -1;
    }
  }
}

while (!queue.empty()) {
  const [x, y] = queue.pop();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
    if (dist[nx][ny] >= 0) continue;
    queue.push([nx, ny]);
    dist[nx][ny] = dist[x][y] + 1;
  }
}

let ans = 0;
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (dist[i][j] === -1) {
      console.log(-1);
      return;
    }

    ans = Math.max(ans, dist[i][j]);
  }
}

console.log(ans);
