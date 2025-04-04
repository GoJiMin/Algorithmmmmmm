const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

/**
 * arr = [8 3 2 4 8 7 2 4 0 8 8]
 *
 * dp[i][j]는 i번째 수까지 등식을 만들어 어떤 수 j를 만드는 경우의 수..
 *
 * dp[0][8] => arr 배열의 수 8 하나를 써서 8을 만들 수 있는 경우의 수는 1개..
 *
 * 그럼 i가 1일 때는? 2중 for문으로 순회하면서 dp[i - 1][j]가 0이 아닐 경우 특정 수 j에 arr[i] 값을 더하거나 뺀 값이
 * 0이상 20이하라면 이전의 경우의 수를 누적..
 */

// 0이상 20이하의 수만 만들 수 있음..
const dp = Array.from({length: n}, () => Array(21).fill(0n));
dp[0][arr[0]] = 1n;

for (let i = 1; i <= n - 2; i++) {
  for (let j = 0; j <= 20; j++) {
    if (dp[i - 1][j] !== 0) {
      if (j - arr[i] >= 0) {
        dp[i][j - arr[i]] += dp[i - 1][j];
      }
      if (j + arr[i] <= 20) {
        dp[i][j + arr[i]] += dp[i - 1][j];
      }
    }
  }
}

console.log(dp[n - 2][arr[n - 1]].toString());
