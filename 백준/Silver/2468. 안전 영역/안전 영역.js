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
      this.head = node;
      this.tail = node;
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

const [N, ...arr] = input;
const n = Number(N);
let maxHeight = 0;
const graph = arr.map((el) =>
  el
    .trim()
    .split(" ")
    .map((s) => {
      // 문제에서 제공되는 각 지역의 높이는 1이상 100이하.
      // 이렇게 maxHeight을 미리 상정하고 반복문을 돌리면 높이가 3일 때 쓸모없이 100까지 돌릴 필요가 없음.
      const curHeight = Number(s);

      maxHeight = maxHeight < curHeight ? curHeight : maxHeight;

      return curHeight;
    })
);

// 여기서 vis를 초기에 -1로 설정한 뒤 최대 높이까지 반복문을 순회하며 각 좌표를 해당 높이로 설정함.
// 이는 최대 높이까지의 배열을 계속 선언하지 않고도 사용하기 위함임.
const vis = Array.from(Array(n), () => Array(n).fill(-1));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

let result = 0;

const queue = new Queue();

for (let i = 0; i < maxHeight; i++) {
  let area = 0;
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (vis[j][k] < i && graph[j][k] > i) {
        queue.push([j, k]);
        vis[j][k] = i;
        area++;

        while (!queue.empty()) {
          const [x, y] = queue.pop();

          for (let dir = 0; dir < 4; dir++) {
            const nx = x + dx[dir];
            const ny = y + dy[dir];

            if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
            if (graph[nx][ny] <= i || vis[nx][ny] >= i) continue;

            queue.push([nx, ny]);
            vis[nx][ny] = i;
          }
        }
      }
    }
  }

  result = area > result ? area : result;
}

console.log(result);
