const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].trim().split(" "));

// 체스판을 흰색과 검정색으로 나누고 백트래킹 돌리기
// 어차피 비숍은 대각 행동하니까 다른 셀에 놓으면 서로 공격 못함
const blackCells = [];
const whiteCells = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    // 비숍 놓을 수 있으면
    if (board[i][j] === "1") {
      if ((i + j) % 2 === 0) blackCells.push([i, j]);
      else whiteCells.push([i, j]);
    }
  }
}

const diag1 = Array(2 * n).fill(false);
const diag2 = Array(2 * n).fill(false);

let maxBlack = 0;
let maxWhite = 0;

function dfs(cells, idx, cnt, color) {
  // Base Case
  if (idx >= cells.length) {
    if (color === "black") {
      maxBlack = Math.max(maxBlack, cnt);
    } else {
      maxWhite = Math.max(maxWhite, cnt);
    }
  }

  // 어차피 다 놓고도 못 넘기면 바로 종료
  if (color === "black" && cnt + (cells.length - idx) <= maxBlack) return;
  if (color === "white" && cnt + (cells.length - idx) <= maxWhite) return;

  const [i, j] = cells[idx];

  const d1 = i - j + n - 1;
  const d2 = i + j;

  // 안 놓으면
  dfs(cells, idx + 1, cnt, color);

  // 비숍 놓을 수 있습니까?
  if (!diag1[d1] && !diag2[d2]) {
    diag1[d1] = true;
    diag2[d2] = true;

    dfs(cells, idx + 1, cnt + 1, color);

    diag1[d1] = false;
    diag2[d2] = false;
  }
}

dfs(blackCells, 0, 0, "black");
dfs(whiteCells, 0, 0, "white");

console.log(maxBlack + maxWhite);