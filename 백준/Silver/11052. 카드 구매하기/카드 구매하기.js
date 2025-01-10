const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const dp = Array(n + 1).fill(0);

dp[0] = 0; // 카드를 0개 산다면 0원이 필요하겠죠?

/**
 * 카드를 1개 살 때에는 당연히 1장씩 들어있는 카드팩을 살 때 지불하는 금액이 최고 금액일텐데...
 *
 * 만약에 내가 카드를 2장을 살 거야..
 *
 * 그럼 1장씩 들어있는 카드팩을 2개 사거나,
 * 혹은 2장씩 들어있는 카드팩을 1개 사거나겠죠?
 *
 * 1장씩 들어있는 카드팩은 1원이고, 2장씩 들어있는 카드팩이 5원이라면,
 * 그럼 dp[2] = max(arr[2], dp[1] * 2)..
 *
 * 그럼 추가로 3장을 살 때에는?
 * dp[3] = max(arr[3], dp[2] + dp[1])
 *
 * i % 2 === 0 ? dp[i] = max(dp[i], dp[i / 2] * 2)
 * dp[i] = max(dp[i], dp[i - 1] + dp[1])
 *
 * 위에처럼 풀었다가 틀렸습니다.. 생각해보니까 1 9 18 25 1 이렇게 입력이 주어지고 n이 5라면
 * 당연히 2장, 3장을 구매한 값이 27인데 26으로 나오네요..
 *
 * 5장을 구매한다면 1장을 구매하고 4장을 구매하거나, 혹은 2장을 구매하고 3장을 구매하거나.. 해야겠죠?
 *
 * 그럼 이렇게 풀어볼까요..
 *
 * 5장을 산다면 1장과 4장, 2장과 3장?
 *
 * dp[i] = max(dp[i], dp[i - j] + arr[j]) 이렇게??
 */

for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= i; j++) {
    dp[i] = Math.max(dp[i], dp[i - j] + arr[j - 1]);
  }
}

console.log(dp[n]);
