const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

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
 * 근데 5에서 17로 가는 경우가 뭐지?
 * 5 => 10 => 9 => 18 => 17 아하
 * 5 => 4 => 8 => 16 => 17 이렇게?
 */

const [n, k] = input.split(" ").map(Number);

const queue = new Queue();

const dist = Array(100001).fill(-1);

queue.push(n);
dist[n] = 0;

let cnt = 0;
let found = false;

while (!queue.empty()) {
  const cur = queue.pop();

  for (const act of [cur - 1, cur + 1, cur * 2]) {
    if (act < 0 || act > 100000) continue;

    // 동생을 찾았고, 최단 경로로 찾은 경우에만 카운트..
    if (act === k) {
      if (!found) {
        found = true;
        cnt = 1;
      } else if (dist[cur] + 1 === dist[k]) {
        cnt++;
      }
    }

    // 방문하지 않았거나, 혹은 방문했더라도 최단 경로라면 큐에 넣어줌..
    if (dist[act] === -1 || dist[act] === dist[cur] + 1) {
      dist[act] = dist[cur] + 1;
      queue.push(act);
    }
  }
}

console.log(dist[k] + "\n" + cnt);
