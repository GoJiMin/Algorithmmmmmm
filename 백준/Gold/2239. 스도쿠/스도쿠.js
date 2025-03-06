const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 일단 스도쿠는 숫자가 들어가는 행과 열, 그리고 숫자가 포함된 3 * 3 영역에 같은 수가 없어야 하는데요.
 *
 * 그럼 전달된 좌표와 입력될 수를 받아서 같은 행과 열, 3 * 3에 대한 영역을 검사하고, 백트래킹으로 풀면 될 거 같죠?
 */

const board = [];

for (let i = 0; i < input.length; i++)
  board.push(input[i].trim().split("").map(Number));

const stillZero = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) stillZero.push([i, j]);
  }
}

function isValid(x, y, target) {
  for (let i = 0; i < 9; i++) {
    if (board[i][y] === target || board[x][i] === target) return false;
  }

  // 0, 1, 2는 0부터, 3, 4, 5는 3부터, 6, 7, 8은 6부터 시작해야겠죠?
  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;
  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      if (board[i][j] === target) return false;
    }
  }

  return true; // 다 통과하면 true
}

function bt(k) {
  // 빈 칸을 모두 채웠다면
  if (k === stillZero.length) {
    console.log(board.map((row) => row.join("")).join("\n"));

    process.exit(0);
  }

  const [x, y] = stillZero[k];

  for (let i = 1; i <= 9; i++) {
    if (isValid(x, y, i)) {
      board[x][y] = i;
      bt(k + 1);
      board[x][y] = 0;
    }
  }
}

bt(0);
