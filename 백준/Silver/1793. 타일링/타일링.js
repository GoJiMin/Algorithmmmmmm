const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 2 * 1, 2 * 2 타일만을 사용해서 2 * n 직사각형을 채우는 모든 경우의 수를 찾는 거 같은데요..
 *
 * 2 * 1 => n이 1인 경우는 2 * 1 타일만 사용이 가능하니 1
 * 2 * 2 => n이 2인 경우는 2 * 1 타일 2개를 사용하는 방법 2개와 2 * 2 타일 1개를 사용하는 방법으로 3
 * 2 * 3 => n이 3인 경우는 2 * 2 타일을 만드는 경우의 수에 왼쪽과 오른쪽에 2 * 1 타일을 사용할 수 있으니 5
 *
 * dp[i] = 2 * dp[i - 2] + dp[i - 1]
 */

const dp = Array(251);

dp[0] = 1n; // 아무것도 만들지 않는 경우 이것도 1로 침.
dp[1] = 1n;
dp[2] = 3n;

for (let i = 3; i <= 250; i++) {
  dp[i] = 2n * dp[i - 2] + dp[i - 1];
}

const result = [];
for (let i = 0; i < input.length; i++) {
  result.push(dp[Number(input[i]).toString()]);
}

console.log(result.join('\n'));
