const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Deque {
  constructor(MX) {
    this.head = MX;
    this.tail = MX;
    this.arr = Array(2 * MX);
  }

  push_front(x) {
    this.arr[this.head--] = x;
  }

  push_back(x) {
    this.arr[++this.tail] = x;
  }

  pop_front() {
    if (this.empty()) return;

    return this.arr[++this.head];
  }

  empty() {
    return this.tail - this.head === 0;
  }
}

const deque = new Deque(100);

input[2]
  .trim()
  .split(" ")
  .forEach((v) => deque.push_back(v));

const result = [];

input[3]
  .trim()
  .split(" ")
  .forEach((v) => {
    for (let i = 1; i <= +v; i++) {
      const cur = deque.pop_front();

      if (i === +v) {
        result.push(cur);

        deque.push_front(cur);
      } else {
        deque.push_back(cur);
      }
    }
  });

console.log(result.join(" "));
