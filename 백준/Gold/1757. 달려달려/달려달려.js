const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 결국 각 시간에 갈 수 있는 최대 거리를 달리면서 마지막에는 지침 지수가 0이 되어야 한다는 것인데요..
 *
 * 일단 문제의 요구 사항을 좀 보자면,
 * - 지침 지수 => m까지는 ok
 * - 만약 쉰다? 0이 될 때까지 계속 쉬어야 함.
 *   => 근데 이거 잘 생각해보면 지침 지수만큼 i 증가시킬 수 있을듯? 점~프
 * - 마지막 도착점에선 지침 지수가 0이 되어야만 함.
 *
 * 그럼 dp[i][j] => i번째에 j만큼의 지침 지수를 가지고 갈 수 있는 최대 거리?
 *
 * if j + 1 <= m; then dp[i + 1][j + 1] = max(dp[i + 1][j + 1], dp[i][j] + dists[i])
 * => 지침 지수를 증가 시켰을 때 (j + 1), 뛸 수 있으면 (<= m) i분에 뛸 수 있는 거리 더하기
 *
 * if j === 0; then dp[i + 1][j] = max(dp[i + 1][j], dp[i][j])
 * => 안 가고 쉬면
 *
 * if j !== 0; && i + j <= n; then dp[i + j][0] = max(dp[i + j][0], dp[i][j])
 * => 만약 지침 지수가 0이 될 때까지 쉬었을 때 도착점 안에 들어갈 수 있으면
 */

const [n, m] = input[0].split(' ').map(Number);

const dists = [0];
for (let i = 1; i <= n; i++) dists.push(Number(input[i]));

const dp = Array.from({length: n + 1}, () => Array(m + 1).fill(-1));

dp[0][0] = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j <= m; j++) {
    if (dp[i][j] === -1) continue;

    if (j + 1 <= m) {
      dp[i + 1][j + 1] = Math.max(dp[i + 1][j + 1], dp[i][j] + dists[i + 1]);
    }

    if (j === 0) {
      dp[i + 1][0] = Math.max(dp[i + 1][0], dp[i][j]);
    } else {
      if (i + j <= n) {
        dp[i + j][0] = Math.max(dp[i + j][0], dp[i][j]);
      }
    }
  }
}

console.log(dp[n][0]);
