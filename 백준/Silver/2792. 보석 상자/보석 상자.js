const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = [];

let max = -1;
for (let i = 1; i <= m; i++) {
  const cur = Number(input[i]);

  max = Math.max(cur, max);
  arr.push(cur);
}

/**
 * 우선 배분할 수 있는 보석의 최대 갯수는 주어진 보석 중 최대값
 * arr[i] / x 값을 모두 더했을 때 n보다 작으면 후보군
 */

let lo = 1;
let hi = max;

let ans = max;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);

  let needed = 0;
  for (let i = 0; i < m; i++) {
    needed += Math.ceil(arr[i] / mid);
    if (needed > n) break;
  }

  if (needed <= n) {
    ans = mid;
    hi = mid - 1;
  } else {
    lo = mid + 1;
  }
}

console.log(ans);
