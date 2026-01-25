const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 말은 과대 포장이지.. 결국 문제 유형이 가장 긴 증가하는 수열을 구하는 문제 같네요...
 */

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

// 모든 수열은 자기 자신을 포함..
const dp = Array(n).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(Math.max(...dp));
