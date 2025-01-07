const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 알파벳 A - Z까지 1 - 26으로 매핑한다는 거 같은데요..
 *
 * 25114의 경우 2 - 5 - 1 - 14 => B - E - A - N으로 해석되는데요..
 * 2 - 5 - 1 - 1 - 4, 25 - 11 - 4, 25 - 1 - 1 - 4, 25 - 1 - 14 등등 여러 조합이 나오는데,
 * 여기서 중요한 점은 2자리 수가 26이하일 때만 해석이 가능하다는 점으로 문제를 풀어보면 될 거 같습니다..
 *
 * 만약 251인 경우에
 * 2에 대한 조합 1개,
 * 5에 대한 조합을 확인한 후, 앞의 자리 2를 5와 붙였을 때 10 이상 26 이하인 경우 조합이 1개 더 생기니 1개를 더하고,
 * 1에 대한 조합을 1개 추가, 앞의 자리 5를 붙였을 때 51로 26 이상이기 때문에 종료..
 * 로 구하면 될 거 같네요.
 */

const password = [0, ...input].map(Number);
const n = password.length;

const MOD = 100_0000;
const dp = Array(n + 1).fill(0);

dp[0] = 1; // 암호의 0번째 조합은 1개뿐이니까..

for (let i = 1; i <= n; i++) {
  if (password[i] > 0) dp[i] = dp[i - 1] % MOD;

  const twoDigits = password[i - 1] * 10 + password[i];
  if (twoDigits >= 10 && twoDigits <= 26) {
    dp[i] = (dp[i] + dp[i - 2]) % MOD;
  }
}

console.log(dp[n - 1]);
