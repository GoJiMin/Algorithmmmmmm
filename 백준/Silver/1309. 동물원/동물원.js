const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

const n = Number(input);

// 사자를 두지 않는 방법도 경우의 수로 친대요.
// 자 그럼 i번째에 사자를 두지 않을 수도 있어요. 아니면 놓을 수도 있는데, 왼쪽에 둘 수도 있고 오른쪽에 둘 수도 있죠?
// dp[i][0] = 사자가 없는 상황, dp[i][1] = 왼쪽, dp[i][2] = 오른쪽
// 그럼 dp[i][1]에 사자가 있으면 dp[i - 1][0]과 dp[i - 1][2]에 사자를 둘 수 있죠? 이렇게 들어가봅시다.

const dp = Array.from({ length: n + 1 }, () => [0, 0, 0]);

dp[1][0] = 1;
dp[1][1] = 1;
dp[1][2] = 1;

const MOD = 9901;
for (let i = 2; i <= n; i++) {
  dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MOD;
  dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;
  dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
}

const ans = (dp[n][0] + dp[n][1] + dp[n][2]) % MOD;

console.log(ans);
