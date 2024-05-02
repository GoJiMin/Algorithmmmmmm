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
    if (!this.head) {
      return;
    }

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    return data;
  }

  empty() {
    return this.length === 0;
  }
}

const [nm, ...arr] = input;
const [n, m] = nm.split(" ").map(Number);
const boards = arr.map((el) => el.trim().split(" "));

const queue = new Queue();
const visited = Array.from(Array(n), () => Array(m).fill(false));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];
let count = 0;
let maxArea = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (!visited[i][j] && boards[i][j] === "1") {
      queue.push([i, j]);
      visited[i][j] = true;
      count++;

      let area = 1;
      while (!queue.empty()) {
        const [x, y] = queue.pop();

        for (let dir = 0; dir < 4; dir++) {
          const nx = x + dx[dir];
          const ny = y + dy[dir];
          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          if (!visited[nx][ny] && boards[nx][ny] === "1") {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
            area++;
          }
        }
      }

      if (area > maxArea) {
        maxArea = area;
      }
    }
  }
}

console.log(count + "\n" + maxArea);
