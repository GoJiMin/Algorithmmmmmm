const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Node {
  constructor(data) {
    this.data = data;
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

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(""));
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = 0;

// 모든 좌표를 다 돌림... 육지면 그냥 다 확인.
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "L") {
      // 각 BFS마다 새로운 dist 배열을 초기화.. 어차피 메모리
      const dist = Array.from({ length: n }, () => Array(m).fill(-1));
      const queue = new Queue();
      queue.push([i, j]);
      dist[i][j] = 0;

      while (!queue.empty()) {
        const [x, y] = queue.pop();
        for (let d = 0; d < 4; d++) {
          const nx = x + dx[d];
          const ny = y + dy[d];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          // 바다이거나 이미 방문한 경우
          if (board[nx][ny] === "W" || dist[nx][ny] !== -1) continue;

          dist[nx][ny] = dist[x][y] + 1;
          answer = Math.max(answer, dist[nx][ny]);
          queue.push([nx, ny]);
        }
      }
    }
  }
}

console.log(answer);
