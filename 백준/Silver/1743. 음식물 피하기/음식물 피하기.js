const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

class Node {
  constructor(x) {
    this.data = x;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(x) {
    const node = new Node(x);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  pop() {
    if (!this.head) return null;

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    return data;
  }

  empty() {
    return this.length === 0;
  }
}

let idx = 0;
const [n, m, k] = input[idx++].split(' ').map(Number);

const board = Array.from({length: n + 1}, () => Array(m + 1).fill('.'));

for (let i = 0; i < k; i++) {
  const [x, y] = input[idx++].split(' ').map(Number);

  board[x][y] = '#';
}

const directions = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

const vis = Array.from({length: n + 1}, () => Array(m + 1).fill(false));

let max = -1;
const queue = new Queue();
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    let cnt = 0;
    if (board[i][j] === '#') {
      queue.push([i, j]);
      vis[i][j] = true;
      cnt++;
    }

    while (!queue.empty()) {
      const [x, y] = queue.pop();

      for (let dir = 0; dir < 4; dir++) {
        const nx = x + directions[dir][0];
        const ny = y + directions[dir][1];

        if (nx < 1 || nx > n || ny < 1 || ny > m) continue;
        if (board[nx][ny] === '#' && !vis[nx][ny]) {
          queue.push([nx, ny]);
          vis[nx][ny] = true;
          cnt++;
        }
      }
    }

    max = Math.max(max, cnt);
  }
}

console.log(max);
