const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 자 일단.. 문제에서 주어진 보드판을 잘라 K * K 크기의 체스판으로 만들어야 합니다.
 *
 * 여기서 체스판은 W로 시작할 수 있고, 혹은 B로 시작할 수 있습니다..
 *
 * 만약에 K = 3이라면
 *  B W B  W B W
 *  W B W  B W B
 *  B W B  W B W
 * 이렇게 위와 같이 2개의 체스판이 만들어지겠죠?? 그럼 여기서 다시 칠해야 하는 칸의 수가 최소인 경우를 찾아야겠네요..
 *
 * 자 일단 [i][j]가 W로 칠해저야 하는데 B면 W로 다시 칠하고, 반대로 B로 칠해져야 하는데 W면 B로 다시 칠해야겠죠?
 * 또, (1, 1) 칸이 B라면 i + j가 짝수일 때 B, 홀수일 땐 W여야만 합니다.
 *
 * 그럼 W로 칠해져야 하는 누적합 배열 P_W와 B로 칠해져야 하는 P_B 배열이 필요하겠습니다..
 *
 * 그럼 누적합을 어떻게 구할지 고민해봅시다..
 * 우선 현재 board의 컬러를 알아야겠죠??
 *
 * const currentColor = board[i - 1][j - 1];
 *
 * 그리고 이 컬러가 B로 시작하는 체스판의 경우엔
 * const isBlackExp = (i + j) % 2 === 0 ? "B" : "W"; 위에서 봤듯, B로 시작하는 체스판은 i + j가 짝수여야만 합니다.
 * const isWhiteExp = isBlackExp === "B" ? "W" : "B" 그럼 위의 값을 기반으로 W여야했는지 판단하면 되겠죠??
 *
 * const costB = isBlackExp !== currentColor ? 1 : 0 // 이게 원래 B여야만 했는데 현재 W라면 다시 칠해야하니 1.
 * const costW = isWhiteExp !== currentColor ? 1 : 0 // 이게 원래 W여야만 했는데 현재 B라면 다시 칠해야하니 1.
 *
 *   B B B
 *   B W B
 *   W W B 그럼 위의 코드로 이 테이블에 대한 prefix 값은 어떻게 구해야할까요?
 *
 * i = 2, j = 2인 경우 해당 칸은 W죠?? 하지만 i + j가 짝수라 이 칸은 B여아만 합니다. 그럼 costB가 1이겠고,
 * 2차원 누적합은 위에서 아래로 내려오는 누적합을 더하고, 바로 위 행에 대한 값도 누적하고.. 그 다음 공통으로 누적된
 * 값을 빼줘야하니 공식은!
 *
 * prefixB[i][j] = costB + prefixB[i - 1][j] + prefixB[i][j - 1] - prefixB[i - 1][j - 1]
 * 이렇게 나오겠군요.. 한번 구현해봅시다.
 */

const [n, m, k] = input[0].split(" ").map(Number);

const board = [];

for (let i = 1; i <= n; i++) {
  board.push(input[i].trim().split(""));
}

const prefixW = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0)); // W로 시작하는 체스판의 경우.
const prefixB = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0)); // B로 시작하는 체스판의 경우.

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    const currentColor = board[i - 1][j - 1];

    const isBlackExpected = (i + j) % 2 === 0 ? "B" : "W";
    const isWhiteExpected = isBlackExpected === "B" ? "W" : "B";

    const costB = currentColor !== isBlackExpected ? 1 : 0;
    const costW = currentColor !== isWhiteExpected ? 1 : 0;

    prefixB[i][j] =
      costB + prefixB[i - 1][j] + prefixB[i][j - 1] - prefixB[i - 1][j - 1];

    prefixW[i][j] =
      costW + prefixW[i - 1][j] + prefixW[i][j - 1] - prefixW[i - 1][j - 1];
  }
}

/**
 * 자 이렇게 구현해서 예제 입력 1에 대한 누적합 배열을 모두 구현했습니다.
 *     prefixB              prefixW
  [ 0, 0, 0, 0, 0 ]    [ 0, 0, 0, 0, 0 ]
  [ 0, 0, 1, 1, 2 ]    [ 0, 1, 1, 2, 2 ]
  [ 0, 1, 2, 3, 4 ]    [ 0, 1, 2, 3, 4 ]
  [ 0, 1, 3, 4, 5 ]    [ 0, 2, 3, 5, 7 ]
  [ 0, 2, 4, 5, 6 ]    [ 0, 2, 4, 7, 10 ]

  자 그럼 prefixB랑 prefixW를 비교해 최솟값을 내주면 되겠죠??
  우선 여기 구간합 어떻게 구했었죠??

  내가 구하고자 하는 P[i][j]가 있으면 필요 없는 옆통이랑 윗통을 날려줘야겠죠?
  어찌됐던, k * k 크키만큼의 사각형을 구하려면, k부터 시작해야만 합니다. 최소 크기니까요??

  그럼 2중 for문을 k부터 시작하도록 두고 구해봅시다.
 */

let minCost = Math.max(prefixB[n][m], prefixW[n][m]);

for (let i = k; i <= n; i++) {
  for (let j = k; j <= m; j++) {
    // 옆통이랑 윗통을 날린 구간합
    const costB =
      prefixB[i][j] -
      prefixB[i - k][j] -
      prefixB[i][j - k] +
      prefixB[i - k][j - k];

    const costW =
      prefixW[i][j] -
      prefixW[i - k][j] -
      prefixW[i][j - k] +
      prefixW[i - k][j - k];

    minCost = Math.min(minCost, costB, costW);
  }
}

console.log(minCost);
