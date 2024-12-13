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

const [nm, ...arr] = input;

const [n, m] = nm.split(" ").map(Number);

const board = arr.map((el) => el.trim().split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

/**
 * 아 너무 풀기 싫게 생겼습니다.
 *
 * 우선 문제에서 동, 서, 남, 북 방향에 있는 0의 개수만큼 빙하가 녹는다고 합니다.
 * 이거 먼저 구현해봅시다.
 */

function meltIce() {
  // 빙하가 녹은 경우를 보여주는 board 배열
  const tempBoard = Array.from({ length: n }, () => Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] > 0) {
        let seaCnt = 0;

        for (let dir = 0; dir < 4; dir++) {
          const nx = i + dx[dir];
          const ny = j + dy[dir];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
          if (board[nx][ny] === 0) seaCnt++; // 인접한 바다의 수를 증가
        }

        tempBoard[i][j] = Math.max(0, board[i][j] - seaCnt); // 0 이하로는 떨어지지 않기 때문..
      }
    }
  }

  // 끝나고 업데이트하는 이유는 주변의 바다로 인해 녹아 0이 됐을 경우 영향이 가기 때문..
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      board[i][j] = tempBoard[i][j];
    }
  }
}

function countCunks() {
  const vis = Array.from({ length: n }, () => Array(m).fill(false));
  const queue = new Queue();

  let chunks = 0;

  function bfs(x, y) {
    queue.push([x, y]);
    vis[x][y] = true;

    while (!queue.empty()) {
      const [cx, cy] = queue.pop();

      for (let dir = 0; dir < 4; dir++) {
        const nx = cx + dx[dir];
        const ny = cy + dy[dir];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

        if (board[nx][ny] > 0 && !vis[nx][ny]) {
          vis[nx][ny] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] > 0 && !vis[i][j]) {
        bfs(i, j);
        chunks++;
      }
    }
  }

  return chunks;
}

let year = 0;

while (true) {
  year++;
  meltIce();

  const chunks = countCunks();

  if (chunks >= 2) {
    console.log(year);
    break;
  }

  // 다 녹아버리면 빙하 조각도 없겠죠..?
  if (chunks === 0) {
    console.log(0);
    break;
  }
}
