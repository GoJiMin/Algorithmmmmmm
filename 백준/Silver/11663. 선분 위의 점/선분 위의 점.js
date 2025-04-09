const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const dots = input[idx++].split(' ').map(Number);

dots.sort((a, b) => a - b);

function lower_bound(target) {
  let l = 0;
  let r = n;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (dots[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return l;
}

function upper_bound(target) {
  let l = 0;
  let r = n;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);

    if (dots[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }

  return l;
}

const result = [];
for (let i = 0; i < m; i++) {
  const [st, en] = input[idx++].split(' ').map(Number);

  const l_idx = lower_bound(st);
  const r_idx = upper_bound(en);

  result.push(r_idx - l_idx);
}

console.log(result.join('\n'));
