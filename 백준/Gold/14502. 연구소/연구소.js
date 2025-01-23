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
 * 제한시간은 2초..
 *
 * N, M이 최대 8이라면 그냥 벽을 모두 세워버리는 것도 좋을듯? 그럼 빈칸(0)의 좌표를 모두 얻어내고,
 * 3가지를 선택한 모든 조합을 생성하면 되겠죠..? 이 모든 조합은 백트래킹으로 간단하게 잡고 가면 되겠구요..
 */

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].trim().split(" "));

const virus = [];
const empty = [];
let wallCnt = 0;

// 모든 빈 공간을 기록..
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "2") {
      virus.push([i, j]);
    } else if (board[i][j] === "0") {
      empty.push([i, j]);
    } else {
      wallCnt++;
    }
  }
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function spreadVirus(emptySpace) {
  const vis = Array.from({ length: n }, () => Array(m).fill(false));
  const queue = new Queue();

  // 3가지 조합의 빈 공간을 벽으로 가정.
  emptySpace.forEach(([x, y]) => (vis[x][y] = true));

  // 초기에 기록한 바이러스를 큐에 넣기.
  virus.forEach(([x, y]) => {
    queue.push([x, y]);
    vis[x][y] = true;
  });

  let virusCnt = 0; // 바이러스의 총합. 바보니? 0부터 시작해야지
  while (!queue.empty()) {
    const [x, y] = queue.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (!vis[nx][ny] && board[nx][ny] !== "1") {
        queue.push([nx, ny]);
        vis[nx][ny] = true;
        virusCnt++; // 확산되는 바이러스 기록.
      }
    }
  }

  return virusCnt;
}

let maxSafeArea = 0;
const cur = [];

function bt(k, idx) {
  if (k === 3) {
    const virusCnt = spreadVirus(cur);

    // 초기에 구해놓은 빈 공간의 합 - 확산된 바이러스 양 - 새로 새운 벽 3개. = 안전영역?
    const result = empty.length - virusCnt - 3;

    maxSafeArea = Math.max(maxSafeArea, result);
    return;
  }

  for (let i = idx; i < empty.length; i++) {
    cur[k] = empty[i];
    bt(k + 1, i + 1);
  }
}

bt(0, 0);

console.log(maxSafeArea);
