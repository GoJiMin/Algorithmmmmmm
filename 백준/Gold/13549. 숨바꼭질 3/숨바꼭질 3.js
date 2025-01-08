const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 가중치가 0인... 숨바꼭질을 최우선으로 탐색해주고...
 * 가중치가 1인... -1, +1의 경우는 우선순위를 좀 뒤로 해서 풀어주는 문제네요..
 *
 * 그럼 덱을 써야될 거 같은데요.. 가중치 0은 push_front, 가중치 1은 push_back..
 */

class Deque {
  constructor(MX) {
    this.head = MX;
    this.tail = MX;
    this.arr = Array(2 * MX);
  }

  push_front(x) {
    this.arr[--this.head] = x;
  }

  push_back(x) {
    this.arr[this.tail++] = x;
  }

  pop_front() {
    if (this.empty()) return;

    return this.arr[this.head++];
  }

  empty() {
    return this.head === this.tail;
  }
}

const [n, k] = input.split(" ").map(Number);
const MAX = 100000;

const dist = Array(MAX + 1).fill(-1);
const deque = new Deque(MAX);

dist[n] = 0;
deque.push_back(n);

while (!deque.empty()) {
  const x = deque.pop_front();

  if (x === k) {
    console.log(dist[x]);
    return;
  }

  const telpo = x * 2;
  if (telpo <= MAX && dist[telpo] === -1) {
    dist[telpo] = dist[x];
    deque.push_front(telpo);
  }

  if (x - 1 >= 0 && dist[x - 1] === -1) {
    dist[x - 1] = dist[x] + 1;
    deque.push_back(x - 1);
  }

  if (x + 1 <= MAX && dist[x + 1] === -1) {
    dist[x + 1] = dist[x] + 1;
    deque.push_back(x + 1);
  }
}
