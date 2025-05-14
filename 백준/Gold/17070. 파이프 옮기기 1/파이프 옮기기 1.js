const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 움직일 수 있는 방향은 오른쪽, 아래, 대각선..
 * 파이프의 방향에 따라 이동 가능한 방법이 달라짐..
 *
 * 가로일 때는 오른쪽, 대각선..
 * 세로일 때는 아래, 대각선..
 * 대각선일 때는 오른쪽, 아래, 대각선 모두..
 *
 * 그럼 dfs를 돌릴 때 파이프의 방향을 같이 전달..
 * 0이면 가로, 1이면 세로, 2면 대각..?
 */

const n = Number(input[0]);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].split(' ').map(Number));

let ans = 0;
function dfs(r, c, dir) {
  // 끝 점이 오른쪽 아래 대각선 지점에 도착했다면..
  if (r === n - 1 && c === n - 1) {
    ans++;
    return;
  }

  // 가로 상태..
  if (dir === 0 || dir === 2) {
    // 오른쪽으로 이동..
    if (c + 1 < n && board[r][c + 1] === 0) {
      dfs(r, c + 1, 0);
    }
  }

  // 세로 상태..
  if (dir === 1 || dir === 2) {
    // 아래로 이동..
    if (r + 1 < n && board[r + 1][c] === 0) {
      dfs(r + 1, c, 1);
    }
  }

  if (r + 1 < n && c + 1 < n && board[r][c + 1] === 0 && board[r + 1][c] === 0 && board[r + 1][c + 1] === 0) {
    // 대각선 이동..
    dfs(r + 1, c + 1, 2);
  }
}

dfs(0, 1, 0);
console.log(ans);
