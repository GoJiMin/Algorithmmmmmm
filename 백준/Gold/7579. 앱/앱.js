const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 최소 비용.. 최대로 얼마.. 이런식으로 나온 문제 보면 이제 DP 써야되나 의심하게 되는 거 같은데요.
 *
 * 우선 첫 번째 줄에 사용 중인 메모리 바이트 수 n, 확보하고 싶은 메모리 바이트 m이 주어집니다.
 * 이 때, 비활성화의 최소 비용을 구하라는 건데요.
 *
 * 30 10 20 35 40에 대해 비활성 비용은 각각 3 0 3 5 4니까요.
 * 60의 메모리를 확보하기 위해 30 10 20을 비활성화해 비용 3 0 3으로 6의 최소 비용이 나온다는거네요..
 *
 * 고민이 되네요 고민이 돼요..
 * 음 60이라는 메모리 바이트를 확보하고 싶다.. 흠..
 *
 * 예전에 배낭 문제 풀었잖아요? 인덱스를 반대로 돌리는데, 여기서 이 메모리 바이트 말구요. 비용에 대해 DP 테이블을 돌려보는건 어떨까요?
 * 예를 들어서 지금 비용의 최대 값은 100까지 주어지잖아요? 그럼
 * 현재 예제 1의 경우 메모리가 5개 주어지잖아요? 그럼 나올 수 있는 최대 비용은 몇일까요?
 * 500이겠죠? 최대가 100인데 5개 있잖아요?
 *
 * 그러면 이렇게 볼 수 있지 않을까요?
 * 제가 지금 0번 인덱스의 30 메모리를 조회하고 있다고 가정해볼게요. 그럼 동시에 비용 3도 조회하고 있겠죠?
 * 자 그럼, dp[500] = Math.max(dp[500], dp[500 - 3] + 30).. 이거 완전 배낭 문제인데요.
 * 비용을 500만큼 사용했을 때, 우리는 497의 비용을 사용했을 때 확보할 수 있는 메모리에 30의 메모리를 확보할 수 있다는 거죠?
 * 그럼 결국 쭉쭉쭉 내려가다보면, dp[3] = Math.max(dp[3], dp[3 - 3] + 30).. 자 dp[0].. 비용 0으로는 당연히 메모리를 0밖에 확보할 수 없겠죠?
 * 초기값은 0으로 설정한채로 구현해봅시다.
 */

const [n, m] = input[0].split(" ").map(Number);
const memory = input[1].split(" ").map(Number);
const cost = input[2].split(" ").map(Number);

const maxCost = n * 100;

const dp = Array(maxCost + 1).fill(0);

for (let i = 0; i < n; i++) {
  const m = memory[i];
  const c = cost[i];

  for (let currentCost = maxCost; currentCost >= c; currentCost--) {
    dp[currentCost] = Math.max(dp[currentCost], dp[currentCost - c] + m);
  }
}

for (let c = 0; c <= maxCost; c++) {
  if (dp[c] >= m) {
    console.log(c);
    break;
  }
}
