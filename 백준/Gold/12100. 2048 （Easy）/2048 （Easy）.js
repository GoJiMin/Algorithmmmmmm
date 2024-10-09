const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [num, ...arr] = input;
const n = Number(num);

const boards = arr.map((el) => el.trim().split(" ").map(Number));

/**
 - 구현 순서.
 1. 블록을 움직이는 함수
  - 블록이 멈추는 경우
    1. 게임판의 끝에 다다를 경우.
    2. 같은 숫자의 블록과 만나 합쳐지는 경우.
    3. 다른 숫자의 블록을 만나는 경우.
  - 위의 조건문에 걸리지 않는다면 게임판의 끝까지 이동.
  - 해당 함수에 필요한 기능.
    1. 블록 좌표 (x, y)를 위의 멈추는 경우에 해당할 때 까지 직선상으로 이동.
      - 방향은 상, 하, 좌, 우를 모두 체크.
    2. 같은 숫자의 블록과 만난다면 블록을 합친다.
    3. 다른 숫자의 블록에 가로막힌다면 즉시 멈춘다.
    4. 0이면 다음 좌표로 이동한다.
 2. 게임판의 각 끝 좌표부터 블록을 체크
  - 게임판의 상 [0, 0] ... [0, r - 1].
  - 게임판의 하 [r - 1, 0] ... [r - 1, r - 1]
  - 게임판의 좌 [0, 0] ... [r - 1, 0]
  - 게임판의 우 [0, r - 1] ... [r - 1, r - 1]
 3. 게임판을 움직일 수 있는 기회는 총 5번.
  - 상 상 상 상 상, 상 상 상 상 하, ... 하 하 하 하 하
  - 모두 확인하기 위해 진법으로 0 0 0 0 0, 0 0 0 0 1, 3 3 3 3 3 까지 돌리기.
 */

const dir = [
  [-1, 0], // 상
  [1, 0], // 하
  [0, -1], // 좌
  [0, 1], // 우
];

// x, y = [0, 0] = 4  curX, curY = [0, 0] = 4 x, y = [1, 0] = 4 boards[curX][curY] = 8 break,
// x, y = [1, 0] = 0  curX, curY = [1, 0] = 0 x, y = [2, 0] = 8 boarxs[curX][curY] = 8 boards[2][0] = 0
function moveBlock(x, y, i, newBoards) {
  // 만약 게임판의 끝에 다다를 경우 종료.
  if (x < 0 || x >= n || y < 0 || y >= n) return;

  const curX = x;
  const curY = y;

  while (1) {
    x += dir[i][0];
    y += dir[i][1];

    // 만약 게임판의 끝에 다다를 경우 종료.
    if (x < 0 || x >= n || y < 0 || y >= n) break;

    // 다음 좌표 블록이 0. 즉, 빈 칸일 경우 다음 좌표로.
    if (newBoards[x][y] === 0) continue;

    // 현재 좌표에 블록이 있는데 다음 좌표 블록과 다르다면 해당 좌표에서 그만두기.
    if (newBoards[curX][curY] && newBoards[curX][curY] !== newBoards[x][y])
      break;

    // 현재 좌표에 블록이 없으면서 다음 좌표에 블록이 있으면 블록 끌어오기.
    if (!newBoards[curX][curY] && newBoards[x][y]) {
      newBoards[curX][curY] = newBoards[x][y];
      newBoards[x][y] = 0;
    }

    // 현재 좌표 블록과 다음 좌표 블록이 같은 블록이라면?
    if (newBoards[curX][curY] === newBoards[x][y]) {
      newBoards[curX][curY] += newBoards[x][y];
      newBoards[x][y] = 0;
      break;
    }
  }

  moveBlock(curX + dir[i][0], curY + dir[i][1], i, newBoards);
}

// 각 방향의 끝 좌표에 있는 모든 블록으로부터 근접한 블록을 순차적으로 탐색.

function checkBlock(startI, startJ, endI, endJ, curDir, newBoards) {
  for (let i = startI; i <= endI; i++) {
    for (let j = startJ; j <= endJ; j++) {
      moveBlock(i, j, curDir, newBoards);
    }
  }
}

// 게임판을 각 방향에 맞게 확인하는 코드는?
// 각 dir은 상 하 좌 우 0 1 2 3

// 게임판의 상 [0, 0] ... [0, r - 1].
// checkBlock(0, 0, 0, n - 1, 1, boards);
// 게임판의 하 [r - 1, 0] ... [r - 1, r - 1]
// checkBlock(n - 1, 0, n - 1, n - 1, 0, boards);
// 게임판의 좌 [0, 0] ... [r - 1, 0]
// checkBlock(0, 0, n - 1, 0, 3, boards);
// 게임판의 우 [0, r - 1] ... [r - 1, r - 1]
// checkBlock(0, n - 1, n - 1, n - 1, 2, boards);

// console.log(boards);

// startI, startJ, endI, endJ, curDir
const acts = [
  [0, 0, 0, n - 1, 1], // 상
  [n - 1, 0, n - 1, n - 1, 0], // 하
  [0, 0, n - 1, 0, 3], // 좌
  [0, n - 1, n - 1, n - 1, 2], // 우
];

let max = 0;

for (let tmp = 0; tmp < 1 << (2 * 5); tmp++) {
  const newBoards = boards.map((row) => [...row]);

  let brute = tmp;

  for (let i = 0; i < 5; i++) {
    const cur = brute % 4;
    brute = Math.floor(brute / 4);

    const [startI, startJ, endI, endJ, curDir] = acts[cur];

    checkBlock(startI, startJ, endI, endJ, curDir, newBoards);
  }

  newBoards.forEach((row) => {
    max = Math.max(...row, max);
  });
}

console.log(max);

/**
반레
4
0 0 2 4
2 4 2 2
0 0 2 0
0 0 2 2
answer: 16, output: 16

오른쪽으로 이동 : 1번 이동
0 0 2 4
0 2 4 4
0 0 0 2
0 0 0 4


위로 이동 : 2번 이동
0 2 2 8
0 0 4 2
0 0 0 4
0 0 0 0

오른쪽으로 이동 : 3번 이동
0 0 4 8
0 0 4 2
0 0 0 4
0 0 0 0

위로 이동 : 4번 이동
0 0 8 8
0 0 0 2
0 0 0 4
0 0 0 0

오른쪽으로 이동 : 5번 이동
0 0 0 16
0 0 0 2
0 0 0 4
0 0 0 0

checkBlock(0, n - 1, n - 1, n - 1, 2, boards);
checkBlock(0, 0, 0, n - 1, 0, boards);
checkBlock(0, n - 1, n - 1, n - 1, 2, boards);
checkBlock(0, 0, 0, n - 1, 0, boards);
checkBlock(0, n - 1, n - 1, n - 1, 2, boards);

 */
