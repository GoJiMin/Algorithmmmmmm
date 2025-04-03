const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const dp = Array(n + 1).fill(Infinity);
dp[0] = 0;

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j] + arr[j - 1]);
  }
}

console.log(dp[n]);
