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

const n = Number(input[0]);

for (let i = 0; i < n; i++) {
  const [I, ...arr] = input.splice(1, 3);
  const loc = arr.map((el) => el.trim().split(" ").map(Number));

  const vis = Array.from(Array(+I), () => Array(+I).fill(-1));
  const queue = new Queue();

  queue.push(loc[0]);
  vis[loc[0][0]][loc[0][1]] = 0;

  while (vis[loc[1][0]][loc[1][1]] === -1) {
    const [x, y] = queue.pop();

    for (let act of [
      [x + 2, y + 1],
      [x + 1, y + 2],
      [x + 2, y - 1],
      [x + 1, y - 2],
      [x - 2, y + 1],
      [x - 1, y + 2],
      [x - 2, y - 1],
      [x - 1, y - 2],
    ]) {
      const [nx, ny] = act;

      if (nx < 0 || nx >= +I || ny < 0 || ny >= +I) continue;
      if (vis[nx][ny] > 0) continue;

      queue.push([nx, ny]);
      vis[nx][ny] = vis[x][y] + 1;
    }
  }

  console.log(vis[loc[1][0]][loc[1][1]]);
}
