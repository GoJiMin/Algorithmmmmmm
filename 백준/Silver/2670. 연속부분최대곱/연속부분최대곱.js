const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = input.slice(1).map(Number);

const dp = Array(n + 1);
dp[0] = arr[0];

let max = arr[0];

for (let i = 1; i < n; i++) {
  dp[i] = Math.max(dp[i - 1] * arr[i], arr[i]);

  max = Math.max(dp[i], max);
}

console.log(max.toFixed(3));
