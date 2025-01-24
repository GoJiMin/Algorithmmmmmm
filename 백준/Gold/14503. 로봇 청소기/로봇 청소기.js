const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 아우 복잡해..
 *
 * 청소기 작동 순서를 일단 정리해놓고 갑시다..
 * 1. 청소기가 있는 칸이 더럽다면, 청소함.
 * 2. 상, 하, 좌, 우가 모두 청소되어있는지 확인한다.
 * 2 - 1. 모두 청소되어있다면, 바라보는 방향을 유지한 채로 한 칸 후진한다. 이후 1번 반복.
 * - 바라보는 방향의 뒤쪽 칸이 벽이라 후진이 불가능하면, 작동을 멈춤.
 * 2 - 2. 청소되지 않은 빈 칸이 있다면, 반시계 방향으로 90도 회전한다.
 * - 바라보는 방향을 기준으로 앞쪽 칸이 청소되지 않았다면 한 칸 전진한 후 1번 반복.
 *
 * 요구사항
 * 1. 청소기가 있는 칸이 더럽다면, 청소한다.
 * 2. 현재 좌표의 상, 하, 좌, 우가 청소되어있는지 확인한다.
 * 3. 현재 좌표에서 상, 하, 좌, 우로 움직인다.
 * 4. 반시계 방향으로 90도 회전한다.
 *
 * 다음으로 각 방의 청소 상태는 0일 경우 청소되지 않은 빈 칸, 1일 경우 벽임.
 * 방의 가장 북쪽, 가장 남쪽, 가장 서쪽, 가장 동쪽 줄 중 하나 이상에 위치한 모든 칸에는 벽이 있고, <= 의미 있음?
 * 로봇 청소기가 있는 칸은 항상 빈 칸임.
 *
 * 문제가 아주 ~~ 드럽네요.
 */

const [n, m] = input[0].split(" ").map(Number);
let [r, c, d] = input[1].split(" ").map(Number);

const board = [];

// dx, dy 배열의 인덱스는 0: 북, 1: 동, 2: 남, 3: 서
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

for (let i = 2; i < 2 + n; i++) board.push(input[i].trim().split(" "));

let cnt = 0;
// 요구사항 1번. 청소기가 있는 칸이 더럽다면, 청소한다.
function cleanUp(x, y) {
  if (board[x][y] === "0") {
    board[x][y] = "2";
    cnt++;
  }
}

// 요구사항 2번. 상, 하, 좌, 우가 청소되어있는지 확인한다.
function isCleanedUp(x, y) {
  for (let dir = 0; dir < 4; dir++) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 모든 벽 무시.
    if (board[nx][ny] === "1") continue;
    if (board[nx][ny] === "0") return false;
  }

  return true;
}

// 요구사항 3번 현재 좌표에서 상, 하, 좌, 우로 움직인다.
// 매개변수 dir은 dx, dy 배열에 사용..
function move(x, y, dir) {
  return [x + dx[dir], y + dy[dir]];
}

// 요구사항 4번 반시계 방향으로 90도 회전한다.
function rotate(dir) {
  return dir - 1 >= 0 ? dir - 1 : 3;
}

function moveBack(x, y, dir) {
  let rotated = dir;
  for (let i = 0; i < 2; i++) rotated = rotate(rotated);

  return move(x, y, rotated);
}

// 필요한 함수들은 모두 만든 거 같은데요.. 이제 조합해서 풀어보면 되겠죠?
function run() {
  while (true) {
    cleanUp(r, c);
    // 모두 청소되어있다면, 방향을 유지한채로, 한 칸 후진한다.
    if (isCleanedUp(r, c)) {
      const [x, y] = moveBack(r, c, d);

      // 후진할 건데, 벽이면 작동 중지.
      if (board[x][y] === "1") break;

      // 아니면 후진함.
      [r, c] = [x, y];
    } else {
      // 하나라도 청소되어있지 않다면, 반시계 방향으로 회전할 거야.
      while (true) {
        d = rotate(d);

        const [x, y] = move(r, c, d);

        // 앞이 청소되지 않은 빈 칸인 경우에 전진.
        if (board[x][y] === "0") {
          [r, c] = [x, y];
          break;
        }
      }
    }
  }
}

run();
console.log(cnt);
