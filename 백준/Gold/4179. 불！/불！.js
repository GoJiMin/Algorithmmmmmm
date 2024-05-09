const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [nm, ...arr] = input;

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

const [n, m] = nm.split(" ").map(Number);
const boards = arr.map((el) => el.trim().split(""));

// 불과 지훈이에 대한 BFS를 수행하기 위해 queue와 dist 배열을 2개 선언함
const distF = Array.from(Array(n), () => Array(m).fill(-1));
const distJ = Array.from(Array(n), () => Array(m).fill(-1));
const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const queueF = new Queue();
const queueJ = new Queue();

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (boards[i][j] === "F") {
      queueF.push([i, j]);
      distF[i][j] = 0;
    }
    if (boards[i][j] === "J") {
      queueJ.push([i, j]);
      distJ[i][j] = 0;
    }
  }
}

// 불에 대한 BFS 먼저 수행
while (!queueF.empty()) {
  const [x, y] = queueF.pop();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    if (distF[nx][ny] >= 0 || boards[nx][ny] === "#") continue;

    queueF.push([nx, ny]);
    distF[nx][ny] = distF[x][y] + 1;
  }
}

// 지훈이에 대한 BFS 수행
while (!queueJ.empty()) {
  const [x, y] = queueJ.pop();

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 만약 boards의 범위를 벗어난다면 이는 탈출에 성공한 것이므로 좌표 반환
    if (nx < 0 || nx >= n || ny < 0 || ny >= m) {
      console.log(distJ[x][y] + 1);
      return;
    }
    if (distJ[nx][ny] >= 0 || boards[nx][ny] === "#") continue;
    // 불의 좌표가 -1이라면 이는 벽임.
    // 벽이 아님과 동시에 지훈이가 불보다 먼저 도착해야되므로 동일한 좌표에서 거리 값이 더 낮아야 됨.
    if (distJ[x][y] + 1 >= distF[nx][ny] && distF[nx][ny] !== -1) continue;

    queueJ.push([nx, ny]);
    distJ[nx][ny] = distJ[x][y] + 1;
  }
}

// 위의 과정을 모두 수행했을 때 리턴할 수 없다면 이는 탈출이 불가하다는 것을 의미함.
console.log("IMPOSSIBLE");
