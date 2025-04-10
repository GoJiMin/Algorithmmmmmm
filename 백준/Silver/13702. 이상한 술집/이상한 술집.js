const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, k] = input[0].split(' ').map(Number);

const arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(Number(input[i]));
}

let lo = 1;
let hi = Math.max(...arr);

let ans = 0;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.floor(arr[i] / mid);
  }

  if (total >= k) {
    ans = mid;
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}

console.log(ans);
