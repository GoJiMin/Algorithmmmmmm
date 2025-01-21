const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 생각하기 어렵다..
 * 우선 예제를 보면 20까지의 정수 중 2개를 골랐을 때, 20이 나오는 경우는
 * (0, 20), (1, 19), ... (20, 0)까지 21개인 거 같네요..
 *
 * 음.. 우선 테이블을 정의해야겠는데, 우선 N까지의 정수니까.. 1차원에.. k개의 정수를 고를 수 있다고 하니
 * 2차원 테이블을 만들어야겠는데요.. dp[i][k] ?
 * 아마 테이블을 이렇게 정의하면 k개의 정수를 사용해서 합이 i가 되는 경우의 수를 저장할 수 있을 거 같네요.,.
 *
 * 우선 점화식을 세우는데 정말 힘들었습니다.. 한 30분은 고민한듯?..
 * 우선 20을 만드는 경우를 생각해보면요. 위의 테이블 정의에 따라 이렇게 나오겠죠?
 * dp[20][2] => 2개의 정수의 합으로 20을 만든다.
 * 그럼요, 이렇게도 볼 수 있겠죠??
 * dp[20][2] = 마지막 수로 0을 골랐다면 20을 고르고 + 마지막 수로 1을 골랐다면 19를 고른다.
 * dp[20][2] = dp[20][1] + dp[19][2]
 *
 * 초기값은 어떻게 세울까요? 항상 조합 문제는 0을 만드는 경우를 1로 봤죠?
 * for(let k = 1; k <= K; k++) dp[0][k] = 1
 * 이겠네요.. 예를 들자면 k가 2일 때, 합이 0이되는 1개의 수를 고른다면, 0을 고르겠구요..
 * 합이 0이되는 2개의 수를 고른다면, 0, 0이니까요..?
 *
 * 다음으로 모든 수는 합이 i가 될 때, 자기 자신을 골라서 만들 수 있겠죠?
 * 합이 19인데 k가 1이면 19를 골라야되니까요.
 * for(let i = 0; i <= N; i++) dp[i][1] = 1
 */

const [N, K] = input.split(" ").map(Number);
const MOD = 1_000_000_000;

const dp = Array.from({ length: N + 1 }, () => Array(K).fill(0));

// 합이 0이 되는..
for (let k = 1; k <= K; k++) dp[0][k] = 1;
// 합이 i가 될 때, 수를 1개 고른다면 자기 자신..
for (let i = 0; i <= N; i++) dp[i][1] = 1;

for (let i = 1; i <= N; i++) {
  for (let k = 2; k <= K; k++) {
    dp[i][k] = (dp[i][k - 1] + dp[i - 1][k]) % MOD;
  }
}

console.log(dp[N][K]);
