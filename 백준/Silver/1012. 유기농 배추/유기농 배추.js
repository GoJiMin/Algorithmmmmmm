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

const [n, ...arr] = input;
const result = [];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

for (let i = 0; i < +n; i++) {
  const [m, n, k] = arr.shift().split(" ").map(Number);
  const loc = arr.splice(0, k).map((el) => el.trim().split(" ").map(Number));

  const boards = Array.from(Array(n), () => Array(m).fill(false));
  const vis = Array.from(Array(n), () => Array(m).fill(false));

  const queue = new Queue();

  let cnt = 0;

  for (let i = 0; i < k; i++) {
    const [y, x] = loc[i];

    boards[x][y] = true;
  }

  for (let i = 0; i < k; i++) {
    const [y, x] = loc[i];

    if (boards[x][y] && !vis[x][y]) {
      queue.push([x, y]);
      vis[x][y] = true;
      cnt++;

      while (!queue.empty()) {
        const [x, y] = queue.pop();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          if (!boards[nx][ny] || vis[nx][ny]) continue;

          queue.push([nx, ny]);
          vis[nx][ny] = true;
        }
      }
    }
  }

  result.push(cnt);
}

console.log(result.join("\n"));
