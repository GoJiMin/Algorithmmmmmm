const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 두 번째 줄에 각 포트가 연결될 번호가 주어지는데요..
 *
 * 생각해보면 각 포트가 꼬이지 않으려면 이전에 나온 번호보다 커야겠죠..? 번호가 작다면 선이 위로 연결되니 꼬일테니까요..
 * 그럼 가장 긴 증가하는 부분 수열 문제라고 보면 될 거 같아요..
 */

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

const dp = Array(n).fill(1);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(Math.max(...dp));
