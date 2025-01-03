const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 주어진 금액을 만드는 모든 방법을 세야됩니다..
 *
 * 우리 손에 1원과 2원 동전만이 있다면 5원을 어떻게 구성할 수 있을까요?
 *
 * 1 1 1 1 1, 1 1 1 2, 1 2 2로 표현할 수 있겠네요.. 그런데 이렇게도 표현할 수 있는데요.
 * 5원은 1원과 (5 - 1)원으로 만들 수 있다.
 * 5원은 2원과 (5 - 2)원으로 만들 수 있다.
 *
 * 즉, 1원과 2원이 있을 때, 각 가지고 있는 동전을 뺀 금액을 구성하는 조합의 가지수를 더해주면 되겠죠?
 *
 * 그럼 목표 금액이 있을 때, 모든 동전을 사용해 우선 만들 수 있는 조합을 모두 DP 배열에 넣어두면 될 거 같은데요..
 *
 * 예를 들자면, 1원짜리 동전으로 만들 수 있는 조합은
 *
 * 1원은 0원을 만드는 조합에서 1원을 추가해 만들 수 있고,
 * 2원은 1원을 만드는 조합에서 1원을 더 추가하면 만들 수 있죠?
 *
 * DP[i] = DP[i] + DP[i - coin];
 * 점화식을 위와 같이 세운 이유는 모든 동전의 조합을 구하려면 1원만으로 만든 조합수에 2원만으로 만든 조합수도 더해줘야되니까..
 */

const T = Number(input[0]);

const ans = [];

for (let i = 0; i < T; i++) {
  const nextCase = i * 3;

  const coins = input[2 + nextCase].split(" ").map(Number);
  const target = Number(input[3 + nextCase]);

  const DP = Array(target + 1).fill(0);

  DP[0] = 1; // 0원은 아무 동전을 선택하지 않는 조합으로 1개..

  coins.forEach((coin) => {
    for (let i = coin; i <= target; i++) {
      DP[i] += DP[i - coin];
    }
  });

  ans.push(DP[target]);
}

console.log(ans.join("\n"));
