const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 한가지 브랜드에서만 사야되는 줄 알았더니.. 아니네요.. 그냥 세트로 가장 싼 곳과 낱개로 가장 싼 곳 찾아서
 * 비교하면 되겠네요.. 짜증나네..
 */

const [n, m] = input[0].split(' ').map(Number);

let minPiece = 1001;
let minSet = 1001;
for (let i = 1; i <= m; i++) {
  const [set, piece] = input[i].split(' ').map(Number);

  minSet = Math.min(minSet, set);
  minPiece = Math.min(minPiece, piece);
}

let ans = Math.ceil(n / 6) * minSet;

const quo = Math.floor(n / 6);
const remain = n - quo * 6 > 0 ? n % 6 : 0;

ans = Math.min(ans, quo * minSet + remain * minPiece, n * minPiece);

console.log(ans);
