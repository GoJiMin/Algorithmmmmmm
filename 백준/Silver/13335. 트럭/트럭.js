const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// n = 트럭의 수, w = 다리의 길이, l = 다리의 최대 하중.
const [n, w, l] = input[0].split(" ").map(Number);
const trucks = input[1].split(" ").map(Number);

class Queue {
  constructor(n) {
    this.head = 0;
    this.tail = n;
    this.arr = Array(n).fill(0);
  }

  dequeue() {
    return this.arr[this.head++];
  }

  push(x) {
    this.arr[this.tail++] = x;
  }
}

const bridge = new Queue(w);

let time = 0;
let sumWeight = 0;

let idx = 0;

while (true) {
  time++;

  // 한 칸 전진...
  sumWeight -= bridge.dequeue();

  if (idx < n) {
    const nextTruck = trucks[idx];

    // 다리에 올라갈 수 있으면
    if (sumWeight + nextTruck <= l) {
      bridge.push(nextTruck);
      sumWeight += nextTruck;
      idx++;
    } else {
      // 못 올라감.
      bridge.push(0);
    }
  } else {
    // 트럭 없으면..
    bridge.push(0);
  }

  if (idx === n && sumWeight === 0) break;
}

console.log(time);
