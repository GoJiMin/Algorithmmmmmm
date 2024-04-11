const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" "));

const [n, ...commands] = input;

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }

    this.length++;
  }

  push_back(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      const originPrev = this.tail;

      originPrev.next = node;
      node.prev = originPrev;

      this.tail = node;
    }

    this.length++;
  }

  pop_front() {
    if (this.length === 0) return -1;

    const data = this.head.data;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      this.head = this.head.next;
      this.head.prev = null;

      this.length--;
    }
    return data;
  }

  pop_back() {
    if (this.length === 0) return -1;

    const data = this.tail.data;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;

      this.length--;
    }
    return data;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.length === 0 ? 1 : 0;
  }

  front() {
    if (this.length === 0) return -1;

    return this.head.data;
  }

  back() {
    if (this.length === 0) return -1;

    return this.tail.data;
  }
}

const deque = new Deque();
const result = [];

for (let command of commands) {
  switch (command[0]) {
    case "push_front":
      deque.push_front(command[1]);
      break;
    case "push_back":
      deque.push_back(command[1]);
      break;
    case "pop_front":
      result.push(deque.pop_front());
      break;
    case "pop_back":
      result.push(deque.pop_back());
      break;
    case "size":
      result.push(deque.size());
      break;
    case "empty":
      result.push(deque.empty());
      break;
    case "front":
      result.push(deque.front());
      break;
    case "back":
      result.push(deque.back());
      break;
  }
}

console.log(result.join("\n"));
