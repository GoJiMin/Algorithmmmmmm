const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 상단의 스티커를 떼는 경우. => 0
 * 하단의 스티커를 떼는 경우. => 1
 * 스티커를 떼지 않는 경우.   => 2
 *
 * 로 dp 테이블을 만들어야겠는걸요..
 *
 * 그럼 상단의 스티커를 떼려면 이전 순서에선 하단의 스티커를 떼거나 혹은 떼지 않았을 경우에만 가능하겠죠?
 * dp[i][0] = max(dp[i - 1][1], dp[i - 1][2]) + sticker[0][i]
 *
 * 그럼 하단의 스티커를 떼려면 이전 순서에선 상단의 스티커를 떼거나 혹은 떼지 않았을 경우에만 가능하겠죠?
 * dp[i][1] = max(dp[i - 1][0], dp[i - 1][2]) + sticker[1][i]
 *
 * 혹은 아무것도 떼지 않는 방법도 있겠죠..?
 * dp[i][2] = max(dp[i - 1][0], dp[i - 1][2])
 */

const t = Number(input[0]);

const result = [];

for (let idx = 0; idx < t; idx++) {
  const st = 1 + idx * 3;

  const n = Number(input[st]);

  const dp = Array.from({ length: n }, () => Array(3).fill(0));
  const sticker = [];

  for (i = st + 1; i <= st + 2; i++) {
    sticker.push(input[i].split(" ").map(Number));
  }

  dp[0][0] = sticker[0][0];
  dp[0][1] = sticker[1][0];
  dp[0][2] = 0;

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][2]) + sticker[0][i];
    dp[i][1] = Math.max(dp[i - 1][0], dp[i - 1][2]) + sticker[1][i];
    dp[i][2] = Math.max(dp[i - 1][0], dp[i - 1][1]);
  }

  result.push(Math.max(...dp[n - 1]));
}

console.log(result.join("\n"));
