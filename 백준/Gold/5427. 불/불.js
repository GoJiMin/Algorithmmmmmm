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

const t = ~~input.shift();

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

function bfs(n, m, graph) {
  const queueS = new Queue();
  const queueF = new Queue();

  const distS = Array.from(Array(n), () => Array(m).fill(-1));
  const distF = Array.from(Array(n), () => Array(m).fill(-1));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === "@") {
        queueS.push([i, j]);
        distS[i][j] = 0;
      } else if (graph[i][j] === "*") {
        queueF.push([i, j]);
        distF[i][j] = 0;
      }
    }
  }

  while (!queueF.empty()) {
    const [x, y] = queueF.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (graph[nx][ny] === "#" || distF[nx][ny] > -1) continue;

      queueF.push([nx, ny]);
      distF[nx][ny] = distF[x][y] + 1;
    }
  }

  while (!queueS.empty()) {
    const [x, y] = queueS.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
        console.log(distS[x][y] + 1);
        return;
      }
      if (graph[nx][ny] === "#" || distS[nx][ny] > -1) continue;

      if (distS[x][y] + 1 >= distF[nx][ny] && distF[nx][ny] !== -1) continue;

      queueS.push([nx, ny]);
      distS[nx][ny] = distS[x][y] + 1;
    }
  }

  console.log("IMPOSSIBLE");
}

for (let i = 0; i < t; i++) {
  const [w, h] = input.shift().split(" ").map(Number);
  const graph = input.splice(0, h).map((el) => el.trim().split(""));

  bfs(h, w, graph);
}
