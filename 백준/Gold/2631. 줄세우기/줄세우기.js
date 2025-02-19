const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 자.. 아이들을 순서대로 세워야 돼요.
 * 문제를 보면 4명의 아이를 순서대로 골라서 움직이는데요. 잘 보면 움직이지 않은 아이들은 3, 5, 6
 * 증가하는 부분 수열 형태로 존재해요.
 *
 * 여기서 생각해볼 수 있는건, 가장 긴 증가하는 수열의 길이를 구하면, 이 아이들은 애초에 순서를 이루고 있으니,
 * 이 아이들은 움직이지 않아도 돼요.
 *
 * 그러니까 증가하는 부분 수열을 제외한 아이들만 움직이면 돼요.
 */

const n = Number(input[0]);

const arr = [];
for (let i = 1; i <= n; i++) arr.push(Number(input[i]));

const dp = Array(n + 1).fill(1); // 모두 자신을 포함하니 1로 채우기

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(n - Math.max(...dp));
