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

  enqueue(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  dequeue() {
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

const [nm, ...arr] = input;
const [n, m] = nm.split(" ").map(Number);
const boards = arr.map((el) => el.split("").map(Number));

// 최단 거리 저장용 배열
const dist = Array.from(Array(n), () =>
  Array.from(Array(m), () => [Infinity, Infinity])
);

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queue = new Queue();
queue.enqueue([0, 0, 0]); // [x, y, 벽 부순 여부]
dist[0][0][0] = 1; // 시작점, 벽을 부수지 않은 상태로 거리 1

while (queue.length > 0) {
  const [x, y, broken] = queue.dequeue();

  // 도착지점 도달
  if (x === n - 1 && y === m - 1) {
    console.log(dist[x][y][broken]);
    return;
  }

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 범위를 벗어난 경우 무시
    if (nx < 0 || ny < 0 || nx >= n || ny >= m) continue;

    // 다음 칸이 이동 가능한 경우 (벽 아님)
    if (boards[nx][ny] === 0 && dist[nx][ny][broken] === Infinity) {
      dist[nx][ny][broken] = dist[x][y][broken] + 1;
      queue.enqueue([nx, ny, broken]);
    }

    // 다음 칸이 벽인 경우, 벽을 부수고 이동
    if (boards[nx][ny] === 1 && broken === 0 && dist[nx][ny][1] === Infinity) {
      dist[nx][ny][1] = dist[x][y][broken] + 1;
      queue.enqueue([nx, ny, 1]);
    }
  }
}

// 도착지점에 도달할 수 없는 경우
console.log(-1);
