const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const n = Number(input[idx++]);
const arr = [];
for (let i = 0; i < n; i++) {
  arr.push(Number(input[idx++]));
}

arr.sort((a, b) => a - b);

let ans = Infinity;

for (let i = 0; i < n; i++) {
  for (let k = 0; k < 5; k++) {
    let x = arr[i] - k;
    if (x < 0) x = 0;

    let count = 0;
    for (let j = 0; j < n; j++) {
      if (arr[j] >= x && arr[j] <= x + 4) {
        count++;
      }
    }
    const need = 5 - count;
    ans = Math.min(ans, need);
  }
}

if (ans < 0) ans = 0;
console.log(ans);
