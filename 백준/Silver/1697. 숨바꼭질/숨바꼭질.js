const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

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

const [n, k] = input;

const dist = Array(100002).fill(-1);
const queue = new Queue();

dist[n] = 0;
queue.push(n);

// k에 도달해 k의 dist 값이 바뀐다면 while문을 종료함.
while (dist[k] === -1) {
  const cur = queue.pop();

  // 수빈이가 움직일 수 있는 경우를 뽑아서 씀.
  for (let act of [cur + 1, cur - 1, cur * 2]) {
    // 지정된 범위를 벗어나면 넘어감.
    if (act < 0 || act > 100000) continue;
    // 이미 도달한 장소라면 넘어감.
    if (dist[act] !== -1) continue;
    dist[act] = dist[cur] + 1;
    queue.push(act);
  }
}

console.log(dist[k]);
