const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

let st = 1;
let en = 1_000_000_000_000;

let ans = Infinity;
while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let cnt = 0;
  arr.forEach(minutes => (cnt += Math.floor(mid / minutes)));

  if (m <= cnt) {
    ans = mid;
    en = mid - 1;
  } else {
    st = mid + 1;
  }
}

console.log(ans);
