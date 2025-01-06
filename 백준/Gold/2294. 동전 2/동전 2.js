const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 가지고 있는 동전을 사용해 k원을 만들고 싶다고 하네요.. 근데 여기에 최소를 곁들여서..
 *
 * 제가 생각한 방법은 다음과 같은데요.. 우선 수중에 가지고 있는 동전만큼의 금액은 바로 만들 수 있죠?
 * 예를 들자면, 5원짜리 동전이 있으면 5원은 이 동전 1개로 만드는게 최소 개수일테니까요?
 *
 * 그럼 우선 각 동전에 대한 개수를 미리 기록해두고, 이제 각 금액에 맞게 만들 수 있는 최소 개수를 알아보면 될 거 같네요.
 *
 * dp 문제를 요즘 많이 풀어서 그런가 유형이 비슷해보이네요..
 *
 * 점화식은 dp[i] = min(dp[i], dp[i - j] + 1)로 세워도 될 거 같은데..
 */

const [nk, ...arr] = input;

const [_, k] = nk.split(" ").map(Number);
const coins = arr.map(Number);

const dp = Array(k + 1).fill(100001);

coins.forEach((coin) => {
  dp[coin] = 1;
}); // 내가 5원짜리 동전이 있다면 5원은 바로 만들 수 있으니까..

for (let targetPrice = 1; targetPrice <= k; targetPrice++) {
  coins.forEach((coin) => {
    if (targetPrice - coin >= 0) {
      dp[targetPrice] = Math.min(dp[targetPrice], dp[targetPrice - coin] + 1);
    }
  });
}

console.log(dp[k] === 100001 ? -1 : dp[k]);
