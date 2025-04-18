const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 조합론이네요..
 *
 * 3C2가 무엇일까요? 3개 중에서 2개를 고른다.. 입니다..
 *
 * 3개 중에서 2개를 고른다.. 조금 바꿔볼까요?
 * 3개 중에서 1개를 미리 고르고, 나머지 1개를 고를 수 있고, 3개 중에서 1가지 원소를 제외하고 고를 수도 있습니다..
 *
 * 1 2 3 중에서 2개를 고르는 조합을 살펴봅시다.
 * 먼저, 1개를 제외해볼까요? 1을 제외하겠습니다..
 * (2, 3)
 *
 * 다음으로 1을 미리 골라볼까요?
 * (1, 2), (1, 3)
 *
 * 모든 조합은 몇개일까요? (1, 2) (1, 3) (2, 3) 총 3개입니다..
 *
 * 그럼 즉, 3C2 = 2C2 + 3C1 이겠네요?
 *
 * 그럼 M개의 원소 중 N개를 고르는 경우 M C N = (M - 1) C (N - 1) + M C (N - 1) 이겠네요..?
 *
 * 다음으로 문제를 풀기 위해 알아둘 것은 수학에서 M개의 원소 중 0개를 고르는 경우의 수는 1입니다..
 *
 * 1 2 3 중에서 0개를 고르는 경우를 살펴봅시다.
 * 1을 고르지 않으며, 2를 고르지 않고, 3을 고르지 않으면 우리는 무엇을 고른걸까요??
 *
 * 아무것도 고르지 않았습니다. 이 아무것도 고르지 않는 선택지로 인해 경우의 수는 1개입니다.
 *
 * 그럼 DP[i][0] = 1 이겠네요.
 *
 * 다음으로 m개의 원소 중에서 m개를 고르는 경우의 수는요?.. 이것도 1개입니다.
 *
 * 1 2 3.. 이렇게 3개의 원소 중에서 3개를 고르는 방법은 1 2 3을 고르는 1개의 방법만이 존재합니다.
 *
 * 고로 DP[i][i] = 1 이겠네요..
 *
 * 그럼 이 내용을 이용해 구현해봅시다.
 */

const n = Number(input[0]);

const dp = Array.from({ length: 31 }, () => Array(31).fill(0));

for (let i = 0; i < 31; i++) {
  dp[i][0] = 1;
  dp[i][i] = 1;
}

for (let i = 2; i < 31; i++) {
  for (let j = 1; j < i; j++) {
    dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
  }
}

const result = [];
for (let i = 1; i <= n; i++) {
  const [n, m] = input[i].split(" ").map(Number);

  result.push(dp[m][n]);
}

console.log(result.join("\n"));
