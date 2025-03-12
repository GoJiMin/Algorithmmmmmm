const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

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
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  pop() {
    if (!this.head) return;

    const data = this.head.data;

    this.head = this.head.next;
    this.length--;

    return data;
  }

  empty() {
    return this.length === 0;
  }
}

/**
 * 어쨌든 정수가 주어졌을 때 그 정수에서 뻗어나갈 수 있는 방향은 4개..
 *
 * D, S, L, R에 대한 동작..
 */

const t = Number(input[0]);

const result = [];
function bfs(A, B) {
  // 0 이상 10000미만
  const vis = Array(10000).fill(false);
  vis[A] = true;

  const queue = new Queue(); // [정수, 커맨드[]]
  queue.push([A, []]);

  while (!queue.empty()) {
    const [n, command] = queue.pop();

    const prevCommand = command.join("");

    if (n === B) {
      result.push(command.join(""));
      return;
    }
    // n에 2를 곱한 뒤 모듈러 10000
    const calD = (2 * n) % 10000;
    if (!vis[calD]) {
      vis[calD] = true;
      queue.push([calD, [prevCommand, "D"]]);
    }

    // n에 1을 빼는데 0이면 9999로 저장
    const calS = n === 0 ? 9999 : n - 1;
    if (!vis[calS]) {
      vis[calS] = true;
      queue.push([calS, [prevCommand, "S"]]);
    }

    // n의 각 자릿수를 회전하기 위해 모두 떼어내기
    const thousands = Math.floor(n / 1000);
    const hundreds = Math.floor((n % 1000) / 100);
    const tens = Math.floor((n % 100) / 10);
    const units = n % 10;

    // 각 자릿수 왼쪽으로 회전 1234 => 2341, 1000 => 1
    const calL = hundreds * 1000 + tens * 100 + units * 10 + thousands;
    if (!vis[calL]) {
      vis[calL] = true;
      queue.push([calL, [prevCommand, "L"]]);
    }

    // 각 자릿수 오른쪽으로 회전 1234 => 4123, 1000 => 100
    const calR = units * 1000 + thousands * 100 + hundreds * 10 + tens;
    if (!vis[calR]) {
      vis[calR] = true;
      queue.push([calR, [prevCommand, "R"]]);
    }
  }
}

for (let i = 1; i <= t; i++) {
  const [A, B] = input[i].split(" ").map(Number);

  bfs(A, B);
}

console.log(result.join("\n"));
