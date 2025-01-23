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

/**
 * 짱 쉬운 bfs 문제..
 */

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].trim().split(" "));

const dist = Array.from({ length: n }, () => Array(m).fill(-1));
const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

const queue = new Queue();
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "0") {
      dist[i][j] = 0;
    } else if (board[i][j] === "2") {
      queue.push([i, j]);
      dist[i][j] = 0;
    }
  }
}

while (!queue.empty()) {
  const [x, y] = queue.pop();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (dist[nx][ny] < 0) {
      dist[nx][ny] = dist[x][y] + 1;
      queue.push([nx, ny]);
    }
  }
}

const result = [];
for (let i = 0; i < n; i++) result.push(dist[i].join(" "));

console.log(result.join("\n"));
