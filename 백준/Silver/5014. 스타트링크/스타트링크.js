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

const [F, S, G, U, D] = input.split(" ").map(Number);

const cnt = Array(F + 1).fill(-1);

const queue = new Queue();

cnt[S] = 0;
queue.push(S);

while (!queue.empty()) {
  const cur = queue.pop();

  if (cur === G) {
    console.log(0);
    return;
  }

  for (let act of [cur + U, cur - D]) {
    if (act === G) {
      console.log(cnt[cur] + 1);
      return;
    }
    if (act < 1 || act >= F) continue;
    if (cnt[act] > -1) continue;

    queue.push(act);
    cnt[act] = cnt[cur] + 1;
  }
}

console.log("use the stairs");