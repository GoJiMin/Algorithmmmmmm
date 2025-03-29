const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const arr = input[2].split(' ').map(Number);

function check(h) {
  if (arr[0] - h > 0) return false;

  for (let i = 0; i < n - 1; i++) {
    if (arr[i + 1] - arr[i] > 2 * h) return false;
  }

  if (arr[m - 1] + h < n) return false;

  return true;
}

let left = 0;
let right = n;
let ans = n;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);

  if (check(mid)) {
    ans = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(ans);
