const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(Number(input[i]));

const total = arr.reduce((acc, v) => acc + v, 0);

let lo = 1;
let hi = Math.max(...arr);

let bestK = 0;

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);
  const cnt = arr.reduce((acc, v) => acc + Math.floor(v / mid), 0);

  if (cnt >= m) {
    bestK = mid; // 가능하니까 더 큰 k 찾기...
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}

console.log(total - bestK * m);
