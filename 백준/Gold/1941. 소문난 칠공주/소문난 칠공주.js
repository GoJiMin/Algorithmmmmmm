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

const boards = input.map((el) => el.trim().split(""));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const arr = [];

function bfs() {
  const vis = Array.from(Array(5), () => Array(5).fill(false));

  for (let i = 0; i < 7; i++) {
    const [x, y] = arr[i];

    vis[x][y] = true;
  }

  const queue = new Queue();

  let dasom = 0;
  let adj = 1;

  queue.push(arr[0]);
  vis[arr[0][0]][arr[0][1]] = false;

  while (!queue.empty()) {
    const [x, y] = queue.pop();

    boards[x][y] === "S" && dasom++;

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;
      if (!vis[nx][ny]) continue;

      queue.push([nx, ny]);
      vis[nx][ny] = false;
      adj++;
    }
  }

  return adj === 7 && dasom >= 4;
}

let cnt = 0;

function solution(k, idx) {
  if (k === 7) {
    if (bfs()) cnt++;

    return;
  }

  for (let i = idx; i < 25; i++) {
    const x = Math.floor(i / 5);
    const y = i % 5;

    arr[k] = [x, y];
    solution(k + 1, i + 1);
  }
}

solution(0, 0);

console.log(cnt);
