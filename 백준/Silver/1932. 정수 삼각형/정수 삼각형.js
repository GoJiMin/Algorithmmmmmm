const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 무작정 더했을 때 최댓값이 나온다고 정답이 아닐듯..
 * 예제에서 7 => 8 => 1 => 7 => 5 의 경로를 거친다면 28
 * 예제에서 7 => 3 => 8 => 7 => 5 의 경로를 거친다면 정답인 30이 나옴.
 *
 * 이건 아래 층을 향할 때 최댓값을 선택하는게 아니라.
 * 아래 층에서 윗층의 최댓값을 선택해야됨.
 *
 * 무슨 뜻이냐.
 *                7
 *            10    15     이 층은 미리 더함.
 *        8      1      8  여기서 왼쪽 8은 당연히 10, 1은 10과 15중에 15를, 오른쪽 8은 당연히 15
 * 이렇게..
 *
 * 그럼 대각선을 어떻게 선택해야될까..?
 *
 * 우선 i번 방은 i와 i - 1을 비교할 수 있음.
 * 그럼 i가 0보다 클 때만 비교를 수행.
 *
 * if(j > 0) dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1]) + dp[i][j]
 * else if (j + 1 is length) dp[i][j] = dp[i - 1][j - 1] + dp[i][j]
 * else dp[i][j] = dp[i - 1][j] + dp[i][j]
 */

const [n, ...arrs] = input;

const nums = arrs.map((el) => el.trim().split(" ").map(Number));

// 0번은 초기값.
for (let i = 1; i < Number(n); i++) {
  for (let j = 0; j < nums[i].length; j++) {
    if (j === 0) {
      // 가장 왼쪽.
      nums[i][j] = nums[i - 1][j] + nums[i][j];
    } else if (j === nums[i].length - 1) {
      // 선택지가 2개.
      nums[i][j] = nums[i - 1][j - 1] + nums[i][j];
    } else {
      // 가장 오른쪽.
      nums[i][j] = Math.max(nums[i - 1][j], nums[i - 1][j - 1]) + nums[i][j];
    }
  }
}

// 마지막 층의 최댓값을 출력.
console.log(Math.max(...nums[n - 1]));
