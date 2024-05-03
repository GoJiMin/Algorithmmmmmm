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
const maze = arr.map((el) => el.trim().split(""));
const vis = Array.from(Array(n), () => Array(m).fill(-1));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
const queue = new Queue();

vis[0][0] = 1;
queue.push([0, 0]);

while (!queue.empty()) {
  const [x, y] = queue.pop();
  const dis = vis[x][y];

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    if (vis[nx][ny] < 0 && maze[nx][ny] === "1") {
      queue.push([nx, ny]);
      vis[nx][ny] = dis + 1;
    }
  }
}

console.log(vis[n - 1][m - 1]);
