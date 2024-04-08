const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" "));

const [[n], ...arr] = input;
const answer = [];

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
    if (!this.head) {
      answer.push(-1);
      return;
    }

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    answer.push(data);
  }

  size() {
    answer.push(this.length);
  }

  empty() {
    this.length === 0 ? answer.push(1) : answer.push(0);
  }

  front() {
    if (!this.head) {
      answer.push(-1);
      return;
    }

    answer.push(this.head.data);
  }

  back() {
    if (!this.head) {
      answer.push(-1);
      return;
    }

    answer.push(this.tail.data);
  }
}

const queue = new Queue();

for (let i = 0; i < n; i++) {
  switch (arr[i][0]) {
    case "push":
      queue.push(arr[i][1]);
      break;
    case "pop":
      queue.pop();
      break;
    case "size":
      queue.size();
      break;
    case "empty":
      queue.empty();
      break;
    case "front":
      queue.front();
      break;
    case "back":
      queue.back();
      break;
  }
}

console.log(answer.join("\n"));
