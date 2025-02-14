const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 연결 요소.. 나누어진 각각의 그래프라고 보면 되는데요.
 * 조건은 연결 요소에 속한 모든 정점을 연결하는 경로가 있고, 또 다른 연결 요소에 속한 정점과 연결되면 안됩니다.
 *
 * 무방향 그래프라고 했으니, 각 정점에서 이어진 간선은 2E.. adj[u].push(v), adj[v].push(u)
 *
 * [2, 5],
 * [1, 5],
 * [4],
 * [3, 6],
 * [2, 1],
 * [4]
 *
 * 각 정점 1부터 6까지 이어진 간선들..
 */

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

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);
const vis = Array(n + 1).fill(false);

for (let i = 1; i <= m; i++) {
  const [u, v] = input[i].split(" ").map(Number);

  adj[u].push(v);
  adj[v].push(u);
}

let cnt = 0;
for (let i = 1; i <= n; i++) {
  if (vis[i]) continue;

  const queue = new Queue();
  queue.push(i);
  vis[i] = true;
  cnt++;

  while (!queue.empty()) {
    const cur = queue.pop();

    for (const nxt of adj[cur]) {
      if (vis[nxt]) continue;

      queue.push(nxt);
      vis[nxt] = true;
    }
  }
}

console.log(cnt);