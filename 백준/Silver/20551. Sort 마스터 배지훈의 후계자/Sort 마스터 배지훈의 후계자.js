const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(Number(input[idx++]));
}

arr.sort((a, b) => a - b);

function lower_bound(target) {
  let l = 0;
  let r = n;

  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

const result = [];
for (let i = 0; i < m; i++) {
  const target = Number(input[idx++]);
  const pos = lower_bound(target);
  if (pos === n || arr[pos] !== target) {
    result.push(-1);
  } else {
    result.push(pos);
  }
}

console.log(result.join('\n'));
