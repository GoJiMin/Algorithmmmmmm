const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 아 진짜 풀기 싫게 생겼다..
 *
 * 제가 생각했을 때... N * M의 격자판에 정해진 모양의 테트로미노를 회전, 반전시킬 수 있음을 고려해보면요.
 * 좌표 (x, y)가 주어졌을 때 테트로미노 5개를 번갈아가면서 놓아보면 될 거 같아요.
 * 동시에 5개를 놓아보고, 각각의 테트로미노를 회전시켜서 놓았을 때 각 좌표별로 놓았을 때의 점수를 갱신해볼게요.
 *
 * 우선 poly는 총 5개, 각각 90도 회전 4번, 반전 2번 5 * 6 = 30, 한 칸당 30번 테트로미노를 놓고, 4번 좌표 값을 더함.
 * 500 * 500 * 30 * 4 = 3000_0000 가능할듯?
 */

const poly = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [0, 2],
  ],
];

function rotate(poly) {
  return poly.map(([x, y]) => [-y, x]);
}

function filpHorizontal(poly) {
  return poly.map(([x, y]) => [x, -y]);
}

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

// 받은 좌표와 poly를 사용해 점수 계산해보기
function addScore(x, y, cur) {
  let score = 0;

  for (let k = 0; k < 4; k++) {
    const nx = x + cur[k][0];
    const ny = y + cur[k][1];

    if (nx >= n || nx < 0 || ny >= m || ny < 0) {
      score = 0;
      break;
    }

    score += board[nx][ny];
  }

  return score;
}

// 좌표를 받고 해당 좌표에서 모든 테트로미노를 놓아봄.
function putTetromino(x, y) {
  let maxScore = 0;

  for (let i = 0; i < 5; i++) {
    let cur = poly[i];

    // 90도 회전 4번 해보기
    for (let j = 0; j < 4; j++) {
      cur = rotate(cur);
      maxScore = Math.max(maxScore, addScore(x, y, cur));
    }

    // 반전 시킨 다음 회전 4번 해보기
    cur = filpHorizontal(cur);
    for (let j = 0; j < 4; j++) {
      cur = rotate(cur);
      maxScore = Math.max(maxScore, addScore(x, y, cur));
    }
  }

  return maxScore;
}

let ans = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    ans = Math.max(ans, putTetromino(i, j));
  }
}

console.log(ans);
