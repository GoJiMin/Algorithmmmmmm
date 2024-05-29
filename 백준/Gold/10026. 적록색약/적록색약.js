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

const [n, ...arr] = input;

const N = Number(n);
const graph = arr.map((el) => el.trim().split(""));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

// 적록색약을 가진 사람과 아닌 사람의 vis 배열을 따로 선언
const visRGB = Array.from(Array(N), () => Array(N).fill(false));
const visRG = Array.from(Array(N), () => Array(N).fill(false));


// 마찬가지로 count 변수도 따로 선언
let cntRGB = 0;
let cntRG = 0;

const queue = new Queue();

//적록색약이 아닌 경우
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visRGB[i][j]) {
      queue.push([i, j]);
      cntRGB++;
    }

    while (!queue.empty()) {
      const [x, y] = queue.pop();

      for (let dir = 0; dir < 4; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      // 현재 좌표와 nx, ny 좌표의 색이 같을 경우
        if (!visRGB[nx][ny] && graph[x][y] === graph[nx][ny]) {
          visRGB[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }
}

// 적록색약일 경우
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visRG[i][j]) {
      queue.push([i, j]);
      cntRG++;
    }

    while (!queue.empty()) {
      const [x, y] = queue.pop();

      for (let dir = 0; dir < 4; dir++) {
        const nx = x + dx[dir];
        const ny = y + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (!visRG[nx][ny]) {
          // R, G를 동일하게 처리
          if (graph[x][y] === "R" || graph[x][y] === "G") {
            if (graph[nx][ny] === "R" || graph[nx][ny] === "G") {
              queue.push([nx, ny]);
              visRG[nx][ny] = true;
            }
          }

          if (graph[nx][ny] === graph[x][y]) {
            queue.push([nx, ny]);
            visRG[nx][ny] = true;
          }
        }
      }
    }
  }
}

console.log(cntRGB + " " + cntRG);
