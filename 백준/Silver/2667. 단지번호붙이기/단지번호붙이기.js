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

const [N, ...arr] = input;
const n = Number(N);
const graph = arr.map((el) => el.trim().split(""));

const vis = Array.from(Array(n), () => Array(n).fill(-1));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = new Queue();

let cnt = 0;
const result = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (vis[i][j] === -1 && graph[i][j] === "1") {
      vis[i][j] = 0;
      queue.push([i, j]);
      cnt++;

      let area = 1;
      while (!queue.empty()) {
        const [x, y] = queue.pop();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];

          if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
          if (graph[nx][ny] === "0" || vis[nx][ny] > -1) continue;

          vis[nx][ny] = 0;
          queue.push([nx, ny]);
          area++;
        }
      }

      result.push(area);
    }
  }
}

console.log(cnt + "\n" + result.sort((a, b) => a - b).join("\n"));
