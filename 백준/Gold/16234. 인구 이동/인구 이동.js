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

const [n, l, r] = input[0].split(' ').map(Number);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].split(' ').map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let days = 0;
while (true) {
  const vis = Array.from({length: n}, () => Array(n).fill(false));
  let isMoved = false;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (vis[i][j]) continue;

      const queue = new Queue();

      const union = [];
      let sum = 0;

      queue.push([i, j]);
      vis[i][j] = true;

      // 연합 목록에 추가하고 더해주기
      union.push([i, j]);
      sum += board[i][j];

      while (queue.length) {
        const [x, y] = queue.pop();

        for (const [dx, dy] of directions) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
          if (vis[nx][ny]) continue;

          // 차이가 l 이상 r 이하여아만 연합임..
          const diff = Math.abs(board[x][y] - board[nx][ny]);
          if (diff < l || diff > r) continue;

          queue.push([nx, ny]);
          vis[nx][ny] = true;

          union.push([nx, ny]);
          sum += board[nx][ny];
        }
      }

      // 연합의 크기가 1 이상이면 인구 이동이 일어난 상태..
      if (union.length > 1) {
        isMoved = true;
        const newP = Math.floor(sum / union.length);

        for (const [x, y] of union) {
          board[x][y] = newP;
        }
      }
    }
  }

  // 인구 이동 안 일어났으면 탈출..
  if (!isMoved) break;
  days++;
}

console.log(days);
