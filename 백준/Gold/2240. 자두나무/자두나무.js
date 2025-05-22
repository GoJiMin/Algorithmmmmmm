const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * T초 동안 자두가 떨어짐..
 *
 * dp[T][W] = T초까지 W번 움직여서 먹을 수 있는 자두의 최대 개수..?
 */

const [T, W] = input[0].split(' ').map(Number);
const arr = input.slice(1).map(Number);

const dp = Array.from({length: T + 1}, () => Array(W + 1).fill(0));

for (let t = 1; t <= T; t++) {
  for (let w = 0; w <= W; w++) {
    const pos = w % 2 === 0 ? 1 : 2;
    const add = arr[t - 1] === pos ? 1 : 0;

    if (w === 0) {
      dp[t][w] = dp[t - 1][w] + add;
    } else {
      dp[t][w] = Math.max(dp[t - 1][w], dp[t - 1][w - 1]) + add;
    }
  }
}

let ans = 0;
for (let w = 0; w <= W; w++) {
  ans = Math.max(ans, dp[T][w]);
}

console.log(ans);
