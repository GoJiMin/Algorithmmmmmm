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

const [number, ...arr] = input;
const n = Number(number);

const boards = arr.map((el) => el.trim().split(""));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const visRGB = Array.from(Array(n), () => Array(n).fill(false));
const visRG = Array.from(Array(n), () => Array(n).fill(false));

const queueRGB = new Queue();
const queueRG = new Queue();

const result = [0, 0];

function bfs(i, j, color, vis, idx, queue) {
  queue.push([i, j]);
  vis[i][j] = true;
  result[idx]++;

  while (!queue.empty()) {
    const [x, y] = queue.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (!vis[nx][ny] && boards[nx][ny] === color) {
        queue.push([nx, ny]);
        vis[nx][ny] = true;
      }
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visRGB[i][j]) {
      bfs(i, j, boards[i][j], visRGB, 0, queueRGB);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (boards[i][j] === "R") {
      boards[i][j] = "G";
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visRG[i][j]) {
      bfs(i, j, boards[i][j], visRG, 1, queueRG);
    }
  }
}

console.log(result.join(" "));
