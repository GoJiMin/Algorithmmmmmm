const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 주의사항!!!!!!!!!
 * 1, 2, N번 집의 색은 모두 달라야 한다.
 * N, N-1, 1번 집의 색은 모두 달라야 한다.
 * i번째 집의 색은 i - 1, i + 1번 집의 색과 달라야 한다.
 *
 * 어떻게 보면 위 아래 집의 색이 모두 달라야 한다는 건데, 추가적으로 1번 집과 N번 집의 색도 달라야 하네요.
 * 만약 N이 3이라면 자연스럽게
 * R X X
 * X G X
 * X X B 로 고를 수 있겠지만 만약 N이 5 정도로 넘어가면
 *
 * R X X
 * X G X
 * R X X
 * X X B
 * R X X 이렇게 1번과 N번이 겹치는 경우도 생기니 점화식을 잘 세워봅시다..
 *
 * 생각한 방법으로는 아예 첫번째 집의 색을 모두 고정시켜버리는 건데요.. 일단 해보고 다시 작성하러 올게요..
 */

const n = Number(input[0]);
const rgb = [];

for (let i = 1; i <= n; i++) rgb.push(input[i].split(" ").map(Number));

const bigNumber = 1_000_000_000;

function paint(firstColor) {
  const dp = Array.from({ length: n }, () => Array(3).fill(0));

  // 우리가 확인하고자 하는 첫번째 집만 골라주고 나머지는 그냥 큰 값으로 설정해버리기.
  // 어차피 점화식에서 최소 값을 고르기 때문에, bigNumber가 들어있는 칸을 고르지 않음.
  for (let c = 0; c < 3; c++) {
    if (c === firstColor) {
      dp[0][c] = rgb[0][c];
    } else {
      dp[0][c] = bigNumber;
    }
  }

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + rgb[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + rgb[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + rgb[i][2];
  }

  // 위의 로직을 통해 firstColor가 1일 때 어떻게 흘러가나 볼까요?
  /**
   * dp[0]은 [big, 40, big]으로 초기화 되겠죠? c === firstColor일 때만 rgb의 값을 선택하니까요.
   * 그럼 dp[1][0]은요? 40과 big중 40을 골라 89, dp[1][1]은 big big만 선택할 수 있으니 big, dp[1][2]는 big과 40중 40
   * dp[1]은 [89, big, 97]
   * dp[2]는 [110, 178, 188]
   *
   * 그럼 우리는 이 마지막 열에서 firstColor와 다른 집을 선택해줘야겠죠? c가 1이 아닌 dp[2][0], dp[2][2] 중에 110을 골라 return 하게 되겠죠??
   */

  let result = bigNumber;
  for (let c = 0; c < 3; c++) {
    if (c !== firstColor && dp[n - 1][c] < result) result = dp[n - 1][c];
  }

  return result;
}

let ans = bigNumber;
for (let c = 0; c < 3; c++) {
  const cost = paint(c);

  ans = Math.min(ans, cost);
}

console.log(ans);
