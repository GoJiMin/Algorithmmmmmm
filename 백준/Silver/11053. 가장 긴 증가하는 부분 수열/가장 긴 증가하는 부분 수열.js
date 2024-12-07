const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// 모든 증가하는 수열은 자기 자신을 포함하니 1로 초기화..
const dp = Array(n).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    /**
     * arr[3] = 30인 경우를 보자.
     *
     * 30 > 10, 30 > 20, 30 > 10 이렇게 이전 인덱스의 모든 수를 순회하게 된다.
     * 그럼 이전 수열에 30을 붙일 수 있다.
     *
     * dp[i] = max(dp[i], dp[j] + 1)
     */
    if (arr[i] > arr[j]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

const ans = Math.max(...dp);

console.log(ans);
