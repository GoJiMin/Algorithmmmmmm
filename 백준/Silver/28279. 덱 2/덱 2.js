const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Deque {
  constructor(MX) {
    this.data = Array(2 * MX);
    this.head = MX;
    this.tail = MX;
  }

  push_front(x) {
    this.data[this.head--] = x;
  }

  push_back(x) {
    this.data[++this.tail] = x;
  }

  pop_front() {
    if (this.empty()) return -1;

    return this.data[++this.head];
  }

  pop_back() {
    if (this.empty()) return -1;

    return this.data[this.tail--];
  }

  size() {
    return this.tail - this.head;
  }

  empty() {
    return this.size() === 0 ? 1 : 0;
  }

  front() {
    if (this.empty()) return -1;

    return this.data[this.head + 1];
  }

  back() {
    if (this.empty()) return -1;

    return this.data[this.tail];
  }
}

const n = Number(input[0]);

const deque = new Deque(1000005);

const result = [];

function checkAction([type, x]) {
  switch (type) {
    case "1":
      deque.push_front(x);
      return;
    case "2":
      deque.push_back(x);
      return;
    case "3":
      return result.push(deque.pop_front());
    case "4":
      return result.push(deque.pop_back());
    case "5":
      return result.push(deque.size());
    case "6":
      return result.push(deque.empty());
    case "7":
      return result.push(deque.front());
    case "8":
      return result.push(deque.back());
  }
}

for (let i = 1; i <= n; i++) {
  const action = input[i].trim().split(" ");

  checkAction(action);
}

console.log(result.join("\n"));
