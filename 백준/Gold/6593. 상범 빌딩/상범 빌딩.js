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

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
const dz = [1, -1];

function checkStart(l, r, c, graph) {
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < r; j++) {
      for (let k = 0; k < c; k++) {
        if (graph[i][j][k] === "S") {
          return [i, j, k];
        }
      }
    }
  }
}

function bfs(l, r, c, graph, start) {
  const vis = Array.from({ length: l }, () =>
    Array.from({ length: r }, () => Array(c).fill(-1))
  );

  const [z, y, x] = start;
  const queue = new Queue();

  queue.push([z, y, x]);
  vis[z][y][x] = 0;

  while (!queue.empty()) {
    const [z, y, x] = queue.pop();

    for (let dir = 0; dir < 2; dir++) {
      const nz = z + dz[dir];

      if (nz < 0 || nz >= l) continue;
      if (vis[nz][y][x] > -1 || graph[nz][y][x] === "#") continue;
      if (graph[nz][y][x] === "E") {
        console.log(`Escaped in ${vis[z][y][x] + 1} minute(s).`);
        return;
      }

      queue.push([nz, y, x]);
      vis[nz][y][x] = vis[z][y][x] + 1;
    }

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= c || ny < 0 || ny >= r) continue;

      if (vis[z][ny][nx] > -1 || graph[z][ny][nx] === "#") continue;
      if (graph[z][ny][nx] === "E") {
        console.log(`Escaped in ${vis[z][y][x] + 1} minute(s).`);
        return;
      }

      queue.push([z, ny, nx]);
      vis[z][ny][nx] = vis[z][y][x] + 1;
    }
  }

  console.log("Trapped!");
  return;
}

while (!(input[0] === "0 0 0")) {
  const [l, r, c] = input.shift().split(" ").map(Number);

  const graph = [];

  for (let i = 0; i < l; i++) {
    graph.push(input.splice(0, r + 1));
  }

  const start = checkStart(l, r, c, graph);

  bfs(l, r, c, graph, start);
}
