const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 큐를 사용하는 구현 문제 같은데요..??
 *
 * 우선순위를 확인하면서 요세푸스 처럼 뒤로 보내고 앞에서 빼고 해야겠네요..
 * 무언가를 열심히 적으면서 풀 정도의 문제는 아니니 그냥 빨리 풀어봅시다.
 */

class Queue {
  constructor(n, arr) {
    this.head = 0;
    this.tail = n;
    this.arr = [...arr];
  }

  push(x) {
    this.arr[this.tail++] = x;
  }

  dequeue() {
    return this.arr[this.head++];
  }

  empty() {
    return this.head === this.tail;
  }
}

const t = Number(input[0]);

let idx = 1;

const result = [];

for (let i = 0; i < t; i++) {
  const [n, m] = input[idx++].split(" ").map(Number);
  const docs = input[idx++]
    .split(" ")
    .map((doc, i) => ({ priority: Number(doc), idx: i }));

  const queue = new Queue(n, docs);

  let printed = 0;

  docs.sort((a, b) => b.priority - a.priority);

  while (!queue.empty()) {
    const curDoc = queue.dequeue();

    if (curDoc.priority === docs[printed].priority) {
      printed++;

      if (curDoc.idx === m) {
        result.push(printed);
        break;
      }
    } else {
      queue.push(curDoc);
    }
  }
}

console.log(result.join("\n"));
