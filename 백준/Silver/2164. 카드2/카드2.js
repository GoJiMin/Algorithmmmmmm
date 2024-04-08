const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
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

  enqueue(data) {
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

  dequeue() {
    if (!this.head) return null;

    this.head = this.head.next;
    this.length--;
  }

  size() {
    return this.length;
  }

  front() {
    if (!this.head) return null;

    return this.head.data;
  }

  swap() {
    if (this.size() === 1) {
      console.log(this.front());
      return;
    }

    this.dequeue();
    this.enqueue(this.head.data);
    this.dequeue();
  }
}

const queue = new Queue();

for (let i = 1; i <= input; i++) {
  queue.enqueue(i);
}

for (let i = 0; i < input; i++) {
  queue.swap();
}
