const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ");

class Queue {
  constructor(data, n) {
    this.data = data;
    this.head = 0;
    this.tail = n;
  }

  enqueue(x) {
    this.data[this.tail++] = x;
  }

  dequeue() {
    if (this.empty()) return;

    return this.data[this.head++];
  }

  front() {
    if (this.empty()) return;

    return this.data[this.head];
  }

  empty() {
    return this.tail === this.head;
  }

  size() {
    return this.tail - this.head;
  }
}

const [n, k] = input.map(Number);

const queue = new Queue(
  Array.from({ length: n }, (_, i) => i + 1),
  n
);

const result = [];

let idx = 1;

while (queue.size()) {
  if (idx % k === 0) {
    result.push(queue.dequeue());
  } else {
    queue.enqueue(queue.dequeue());
  }

  idx++;
}

console.log(`<${result.join(", ")}>`);
