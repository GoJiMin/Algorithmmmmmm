const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 우선 고려할 사항은 정사각형이니 i, j는 min(n, m)까지만 돌아야 함.
 */

const [n, m] = input[0].split(' ').map(Number);

const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split(''));

const max = Math.min(n, m);

let result = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    const cur = board[i][j];

    // 1 * 1 정사각형부터 min(n, m) * min(n, m) 정사각형까지 확인.
    for (let k = 0; k < max; k++) {
      if (i + 1 * k >= n || j + 1 * k >= m) continue;

      const right = board[i][j + 1 * k];
      const down = board[i + 1 * k][j];
      const diag = board[i + 1 * k][j + 1 * k];

      if (cur === right && cur === down && cur === diag) result = Math.max(result, (k + 1) ** 2);
    }
  }
}

console.log(result);
