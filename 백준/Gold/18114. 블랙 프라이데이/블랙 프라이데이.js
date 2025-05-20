const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, c] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
arr.sort((a, b) => a - b);

for (let i = 0; i < n; i++) {
  if (arr[i] === c) {
    console.log(1);
    process.exit(0);
  }
}

let l = 0;
let r = n - 1;
while (l < r) {
  const sum2 = arr[l] + arr[r];
  if (sum2 === c) {
    console.log(1);
    process.exit(0);
  }
  sum2 < c ? l++ : r--;
}

for (let i = 0; i < n - 2; i++) {
  const target = c - arr[i];

  let left = i + 1;
  let right = n - 1;
  while (left < right) {
    const sum2 = arr[left] + arr[right];
    if (sum2 === target) {
      console.log(1);
      process.exit(0);
    }
    sum2 < target ? left++ : right--;
  }
}

console.log(0);
