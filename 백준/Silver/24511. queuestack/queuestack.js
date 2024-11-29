const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 하.. 문제 이해하기가 더 어려운 거 같습니다..
 *
 * stack일 때에는 push된 값이 바로 pop 됩니다. 그럼 어떤 값이 있던 결국 무시되겠네요..
 * queue일 때에는 push된 값이 위에 쌓일테고, 먼저 있던 값이 pop 되겠네요.. 그럼 그냥 stack은 없는 놈 치겠습니다.
 */

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

  pop_back() {
    if (this.tail - this.head === 0) return;

    return this.data[this.tail--];
  }
}

const deque = new Deque(Number(input[0]) + 1);

const arrA = input[1].trim().split(" ");
const arrB = input[2].trim().split(" ");

arrA.forEach((v, i) => {
  if (v === "0") deque.push_back(arrB[i]);
});

const arrM = input[4].trim().split(" ");

const result = [];

arrM.forEach((v) => {
  deque.push_front(v);
  result.push(deque.pop_back());
});

console.log(result.join(" "));
