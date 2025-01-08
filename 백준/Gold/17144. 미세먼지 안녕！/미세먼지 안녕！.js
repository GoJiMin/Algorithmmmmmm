const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 와 진짜.. 문제 읽어만 봤는데도 아주 재밌어 죽어버리겠네요.. 하하
 *
 * 구현 목록
 * 1. 미세먼지가 확산된다.
 * - 인접한 상, 하, 좌, 우 영역으로 현재 칸의 미세먼지가 10이라면 floor(10 / 5) 만큼 확산된다.
 * - 공기청정기가 있거나, 칸이 없으면 확산될 수 없다.
 * - 확산된 후 현재 칸은 floor(10 / 5) * 확산된 칸만큼 감소한다.
 * - 업데이트가 이루어지기 전에 미리 확산되는 양을 미리 구해야만 한다.
     30 7에 대한 예제로 각 칸에서 확산된 양을 반영해 확산시킬 경우 24 13 => 13의 확산 양 2로 11이 나오지 않고 9가 나옴..
 
 * 2. 공기청정기를 작동시킨다.
 * - 공기청정기는 -1로 주어지며, 상단의 공기청정기는 반시계방향으로 작동한다. 반대로 하단의 공기청정기는 시계 방향으로 작동.
 * - 경로의 모든 미세먼지를 한칸씩 밀며, 공기청정기로 들어온 미세먼지는 사라진다.
 */

// r = 행, c = 열, t = 초
const [r, c, t] = input[0].split(" ").map(Number);
let board = [];

const purifier = {
  top: 0,
  bottom: 0,
};

for (let i = 1; i <= r; i++) {
  board.push(input[i].split(" ").map(Number));

  if (board[i - 1][0] === -1) purifier.bottom = i - 1;
}

purifier.top = purifier.bottom - 1;

const dx = [1, -1, 0, 0];
const dy = [0, 0, -1, 1];

function spreadDust(x, y, newBoard) {
  // 현재 칸에서 확산될 수 있는 먼지의 양을 구하자.
  const dust = Math.floor(board[x][y] / 5);

  // 확산될 수 있는 칸을 구하자.
  let cnt = 0;

  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    if (board[nx][ny] === -1) continue;

    newBoard[nx][ny] += dust;
    cnt++;
  }

  newBoard[x][y] -= dust * cnt;
}

function moveUp(st, en, y, newBoard) {
  for (let i = st; i <= en; i++) {
    if (newBoard[i][y] === 0) continue;

    if (newBoard[i - 1][y] === -1) {
      newBoard[i][y] = 0;

      continue;
    }

    newBoard[i - 1][y] = newBoard[i][y];
    newBoard[i][y] = 0;
  }
}

function moveDown(st, en, y, newBoard) {
  for (let i = st; i >= en; i--) {
    if (newBoard[i][y] === 0) continue;

    if (newBoard[i + 1][y] === -1) {
      newBoard[i][y] = 0;

      continue;
    }

    newBoard[i + 1][y] = newBoard[i][y];
    newBoard[i][y] = 0;
  }
}

function moveRight(x, newBoard) {
  for (let i = c - 1; i > 0; i--) {
    if (newBoard[x][i] === 0) continue;

    newBoard[x][i + 1] = newBoard[x][i];
    newBoard[x][i] = 0;
  }
}

function moveLeft(x, newBoard) {
  for (let i = 1; i < c; i++) {
    if (newBoard[x][i] === 0) continue;

    newBoard[x][i - 1] = newBoard[x][i];
    newBoard[x][i] = 0;
  }
}

// 반시계
function counterclockwise(newBoard) {
  moveDown(purifier.top - 1, 0, 0, newBoard);
  moveLeft(0, newBoard);
  moveUp(1, purifier.top, c - 1, newBoard);
  moveRight(purifier.top, newBoard);
}

// 시계
function clockwise(newBoard) {
  moveUp(purifier.bottom + 1, r - 1, 0, newBoard);
  moveLeft(r - 1, newBoard);
  moveDown(r - 2, purifier.bottom, c - 1, newBoard);
  moveRight(purifier.bottom, newBoard);
}

for (let time = 0; time < t; time++) {
  const newBoard = board.map((el) => [...el]);

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] > 0) spreadDust(i, j, newBoard);
    }
  }

  counterclockwise(newBoard);
  clockwise(newBoard);

  board = newBoard;
}

let cnt = 0;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (board[i][j] === -1) continue;

    cnt += board[i][j];
  }
}

console.log(cnt);
