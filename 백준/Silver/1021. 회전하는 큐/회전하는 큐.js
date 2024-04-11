const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "script.txt")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.init();
  }

  init() {
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
    if (this.length === 0) return;

    const data = this.head.data;

    if (this.length === 1) {
      this.init();
    } else {
      this.head = this.head.next;
      this.head.prev = null;

      this.length--;
    }

    return data;
  }

  pop_back() {
    if (this.length === 0) return;

    const data = this.tail.data;

    if (this.length === 1) {
      this.init();
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;

      this.length--;
    }

    return data;
  }

  front() {
    return this.head.data;
  }

  back() {
    return this.tail.data;
  }

  size() {
    return this.length;
  }

  findFromLeft(data) {
    let distance = 0;
    let cur = this.head;
    while (true) {
      if (data === cur.data) {
        return distance;
      }

      cur = cur.next;
      distance++;
    }
  }
}

const [n, m] = input[0];
const arr = input[1];
let count = 0;

const deque = new Deque();

for (let i = 1; i <= n; i++) {
  deque.push_back(i);
}

for (let i = 0; i < m; i++) {
  const front = deque.size() / 2 > deque.findFromLeft(arr[i]);

  if (front) {
    while (true) {
      if (deque.front() === arr[i]) {
        deque.pop_front();
        break;
      }

      const poped = deque.pop_front();
      deque.push_back(poped);
      count++;
    }
  } else {
    while (true) {
      if (deque.back() === arr[i]) {
        deque.pop_back();
        count++;
        break;
      }

      const poped = deque.pop_back();
      deque.push_front(poped);
      count++;
    }
  }
}

console.log(count);
