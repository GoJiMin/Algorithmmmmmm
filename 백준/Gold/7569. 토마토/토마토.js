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

const [nmh, ...arr] = input;
const [m, n, h] = nmh.split(" ").map(Number);

const ent = arr.map((el) => el.trim().split(" "));

const graph = [];

// 배열을 판에 맞게 3차원 배열로 변경
for (let i = 0; i < h; i++) {
  graph.push(ent.splice(0, n));
}

// 방문 유무를 위한 배열 또한 3차원 배열로 선언
const vis = Array.from(Array(h), () =>
  Array.from(Array(n), () => Array(m).fill(0))
);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
const dz = [-1, 1];

const queue = new Queue();

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (graph[i][j][k] === "1") {
        queue.push([i, j, k]);
        vis[i][j][k] = 0;
      } else if (graph[i][j][k] === "0") {
        vis[i][j][k] = -1;
      }
    }
  }
}

while (!queue.empty()) {
  const [z, y, x] = queue.pop();

  // 먼저 토마토의 위 아래를 판단
  for (let dir = 0; dir < 2; dir++) {
    const nz = z + dz[dir];

    if (nz < 0 || nz >= h) continue;
    if (vis[nz][y][x] >= 0) continue;

    queue.push([nz, y, x]);
    vis[nz][y][x] = vis[z][y][x] + 1;
  }

  // 위와 아래를 판단한 후 해당 토마토의 주변을 탐색
  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
    if (vis[z][ny][nx] >= 0) continue;

    queue.push([z, ny, nx]);
    vis[z][ny][nx] = vis[z][y][x] + 1;
  }
}

let maxArea = 0;

for (let i = 0; i < h; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < m; k++) {
      if (vis[i][j][k] === -1) {
        console.log(-1);
        return;
      }

      maxArea = Math.max(maxArea, vis[i][j][k]);
    }
  }
}

console.log(maxArea);
