const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

arr.sort((a, b) => a - b);

const p = Math.ceil(K / 2);

let sumPeaks = 0;
for (let i = N - p; i < N; i++) {
  sumPeaks += arr[i];
}

let sumValleys = 0;
for (let i = 0; i < p - 1; i++) {
  sumValleys += arr[i];
}

console.log(sumPeaks - sumValleys);
