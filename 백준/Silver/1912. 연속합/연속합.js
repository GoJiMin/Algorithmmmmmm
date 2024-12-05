const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 연속된 수의 합을 구해야된다.
 * 10 -4 3 1 5 6 -35 12 21 -1 => 12와 21을 더했을 때 가장 큰 수가 나옴.
 *
 * table이 있을 때 각 테이블의 인덱스는 수열의 합을 더한 순서로 정한다.
 *
 * 가장 먼저 0번 index와 1번 index를 더한다 10 + (-4) = 6
 * 다음으로 2번 index를 더한다. 6 + 3 = 9
 * 다음으로 3번 index를 더한다. 9 + 1 = 10
 * 다음으로 4번 index를 더한다. 10 + 5 = 15
 * 다음으로 5번 index를 더한다. 15 + 6 = 21
 * 다음으로 6번 index를 더한다. 21 + (-35) = -14
 * 다음으로 7번 index를 더한다. -14 + 12 = -2
 * 이 때, 연속된 수열을 깨버리고 12부터 더하면 연속된 수열보다 10이 크다.
 * dp[i] = Math.max(dp[i], dp[i - 1] + dp[i])
 */

const n = Number(input[0]);
const nums = input[1].split(" ").map(Number);

for (let i = 1; i < n; i++) {
  nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
}

console.log(Math.max(...nums));
