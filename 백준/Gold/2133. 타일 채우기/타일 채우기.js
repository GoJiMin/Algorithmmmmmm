const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 생각해보면..
 * 3 * 1의 벽은 어떤 타일을 써도 채울 수가 없네요?
 *
 * 3 * 2 벽은 1 * 2 벽 3개를 사용하거나 1 * 2 벽을 위에 두고 2 * 1벽을 2개 사용하고, 반대로 하나 해서 3개네요..
 * 3 * 3 벽은 어떤 방법을 사용해도 채울 수 없습니다. 그냥 홀수는 못 채웁니다.
 *
 * 3 * 4 벽은 어떻게 채울까요?
 * 우선 3 * 2 벽 2개를 이어붙일 수 있죠? 그리고 3 * 2벽의 각 경우의 수마다 3 * 2 벽이 붙을 수 있으니
 * 3 * 3.. 거기에 서로 침범해서 붙을 수 있는 경우.. 집 모양으로? 붙을 수 있는 경우가 아래 위 2개 +2 로 11개 입니다..
 *
 * 이 집 모양의 특수패턴은 3 * 4 벽부터 등장하는데요 3 * 6의 벽을 만들 때에는 몇 개의 특수패턴이 필요할까요?
 * 우선 3 * 4 벽에 3 * 2 벽을 붙이는 기본 패턴 => 11 * 3
 * 다음으로 빈 공간에 특수패턴을 붙이는 경우 => 1 * 2
 * 또 다음으로 3 * 2 벽에 특수패턴을 붙이는 경우 => 3 * 2
 * 모든 경우의 수는 41입니다.
 */

const n = Number(input);

if (n % 2 === 1) {
  console.log(0);
  return;
}

const dp = Array(n + 1);

dp[0] = 1; // 아무것도 채우지 않는 경우의 수 1가지.
dp[2] = 3;

for (let i = 4; i <= n; i += 2) {
  dp[i] = dp[i - 2] * 3;

  for (let j = 0; j <= i - 4; j += 2) {
    dp[i] += dp[j] * 2;
  }
}

console.log(dp[n]);
