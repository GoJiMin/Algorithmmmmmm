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

/**
 * 이전에 벽 부수고 이동하기 문제에서 "벽을 k만큼 부술 수 있다"는 조건이 추가됐습니다.
 *
 * 이전에 풀 때는 3차원 배열 dists[x][y][isBroken]으로 isBroken 값이 아직 0일 때 한 번 부술 수 있게 구현했는데,
 * 이번 문제는 isBroken의 인덱스를 k까지 증가시켜주면 되겠죠??
 */

const [n, m, k] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(""));
}

// dists[x][y][c] c는 벽을 부순 횟수로 k만큼의 인덱스를 가지도록 초기화.
const dists = Array.from({ length: n }, () =>
  Array.from({ length: m }, () => Array(k + 1).fill(0))
);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = new Queue();

queue.push([0, 0, 0]);
dists[0][0][0] = 1;

while (!queue.empty()) {
  const [x, y, isBroken] = queue.pop();

  // 종료 조건.
  if (x === n - 1 && y === m - 1) {
    console.log(dists[x][y][isBroken]);

    return;
  }

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

    // 벽을 부수지 않은 경우.
    if (board[nx][ny] === "0" && !dists[nx][ny][isBroken]) {
      dists[nx][ny][isBroken] = dists[x][y][isBroken] + 1;
      queue.push([nx, ny, isBroken]);
    }

    // 벽을 부수는데, 아직 k만큼 벽을 부수지 않았을 경우.
    if (board[nx][ny] === "1" && isBroken < k && !dists[nx][ny][isBroken + 1]) {
      dists[nx][ny][isBroken + 1] = dists[x][y][isBroken] + 1;

      queue.push([nx, ny, isBroken + 1]);
    }
  }
}

// 불가능하면 -1
console.log(-1);
