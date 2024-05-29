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

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const ans = [];

function bfs(n, m, boards) {
  const vis = Array.from(Array(n), () => Array(m).fill(false));
  const queue = new Queue();
  let cnt = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (boards[i][j] && !vis[i][j]) {
        queue.push([i, j]);
        vis[i][j] = true;
        cnt++;
      }

      while (!queue.empty()) {
        const [x, y] = queue.pop();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          if (vis[nx][ny] || !boards[nx][ny]) continue;

          queue.push([nx, ny]);
          vis[nx][ny] = true;
        }
      }
    }
  }

  return cnt;
}

for (let i = 0; i < t; i++) {
  const [m, n, k] = input.shift().split(" ").map(Number);

  const boards = Array.from(Array(n), () => Array(m).fill(false));

  for (let j = 0; j < k; j++) {
    const [y, x] = input.shift().split(" ").map(Number);

    boards[x][y] = true;
  }

  const cnt = bfs(n, m, boards);

  ans.push(cnt);
}

console.log(ans.join("\n"));
