const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 구현 목록
 *
 * 1. 상, 하, 좌, 우로 연결된 같은 색상이 4개 이상인지 판별하기.
 * 2. 4개 이상인 경우 해당 색을 모두 '.' 으로 변경하고 연쇄반응 1증가하기.
 * 3. '.'으로 변경된 구역의 상단에 있는 뿌요들을 아래로 이동시키기.
 * 4. 1, 2, 3을 반복시키기.
 */

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

let board = input.map((el) => el.trim().split(""));

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function countPuyo(x, y, currentColor) {
  const vis = Array.from({ length: 12 }, () => Array(6).fill(false));
  const queue = new Queue();
  const locations = [[x, y]];

  queue.push([x, y]);
  vis[x][y] = true;

  while (!queue.empty()) {
    const [x, y] = queue.pop();

    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];

      if (nx < 0 || nx >= 12 || ny < 0 || ny >= 6) continue;
      if (board[nx][ny] === "." || vis[nx][ny]) continue;
      if (board[nx][ny] === currentColor) {
        queue.push([nx, ny]);
        vis[nx][ny] = true;

        locations.push([nx, ny]);
      }
    }
  }

  if (locations.length >= 4) {
    locations.forEach(([x, y]) => (board[x][y] = "."));

    return true;
  } else {
    return false;
  }
}

function movePuyo(x, y, currentColor) {
  const prevX = x;

  while (true) {
    x++;

    if (x >= 12 || board[x][y] !== ".") {
      x--;
      break;
    }
  }

  if (x > prevX) {
    board[x][y] = currentColor;

    board[prevX][y] = ".";
  }
}

// 구현한 함수를 직접 돌렸을 때 잘 돌아가긴 함... 이제 이걸 조합해서 문제를 풀면 될듯..

let chain = 0;

while (true) {
  let isBoom = false;

  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 6; j++) {
      if (board[i][j] !== "." && countPuyo(i, j, board[i][j])) {
        isBoom = true;
      }
    }
  }

  if (isBoom) {
    for (let i = 10; i >= 0; i--) {
      for (let j = 0; j < 6; j++) {
        if (board[i][j] !== ".") movePuyo(i, j, board[i][j]);
      }
    }

    chain++;
  } else {
    break;
  }
}

console.log(chain);
