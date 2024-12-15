const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

class Deque {
  constructor(MX) {
    this.arr = Array(2 * MX);
    this.head = MX;
    this.tail = MX;
  }

  push_front(data) {
    this.arr[this.head--] = data;
  }

  push_back(data) {
    this.arr[++this.tail] = data;
  }

  pop_front() {
    if (this.empty()) return;

    return this.arr[++this.head];
  }

  pop_back() {
    if (this.empty()) return;

    return this.arr[this.tail--];
  }

  empty() {
    return this.head === this.tail;
  }

  toArray() {
    return this.arr.slice(this.head + 1, this.tail + 1);
  }
}

/**
 * acts 배열에 있는 모든 행동을 끝냈을 때, 카드는 1, 2, 3, ... n 과 같이 순서대로 놓인다.
 *
 * 항상 마지막 순서의 행동은 1로 끝난다..
 *
 * 일단 이 행동을 역순으로 실행하면 카드를 복원할 수 있지 않을까요..?
 *
 * 1 - 제일 위에 있는 카드를 바닥에 내려놓는다 => 내려놓은 카드를 제일 위로 올린다.
 * 2 - 위에서 두 번째 카드를 바닥에 내려놓는다 => 내려놓은 카드를 위에서 두 번째로 올린다.
 * 3 - 제일 밑에 있는 카드를 바닥에 내려놓는다 => 내려놓은 카드를 가장 마지막에 넣는다.
 *
 * 마지막에 내려놓는 카드는 무조건 1이죠?
 */

const n = Number(input[0]);
const acts = input[1].split(" ");

const deque = new Deque(n);

for (let i = n - 1; i >= 0; i--) {
  const act = acts[i];
  const card = n - i;

  if (act === "1") {
    deque.push_front(card);
  } //
  else if (act === "2") {
    const top = deque.pop_front();

    deque.push_front(card);
    deque.push_front(top);
  } //
  else {
    deque.push_back(card);
  }
}

console.log(deque.toArray().join(" "));
