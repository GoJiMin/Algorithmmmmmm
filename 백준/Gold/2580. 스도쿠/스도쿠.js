const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const board = input.map((line) => line.split(" ").map(Number));
const emptySpots = [];

// 빈 칸 찾아서 넣어놓기.
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) {
      emptySpots.push([i, j]);
    }
  }
}

function isValid(x, y, num) {
  // 행 검사
  for (let j = 0; j < 9; j++) {
    if (board[x][j] === num) return false;
  }

  // 열 검사
  for (let i = 0; i < 9; i++) {
    if (board[i][y] === num) return false;
  }

  // 3x3 사각형 검사
  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;

  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

function bt(index) {
  if (index === emptySpots.length) {
    // 모든 빈 칸을 채웠으면 결과 출력
    console.log(board.map((line) => line.join(" ")).join("\n"));
    process.exit(0); // 아예 종료.
  }

  const [x, y] = emptySpots[index];

  for (let num = 1; num <= 9; num++) {
    if (isValid(x, y, num)) {
      board[x][y] = num;
      bt(index + 1);
      board[x][y] = 0; // 실패했으니까 다시 시도해.
    }
  }
}

bt(0);
