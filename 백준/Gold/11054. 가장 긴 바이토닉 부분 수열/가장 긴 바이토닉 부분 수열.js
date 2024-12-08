const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 골드 문제는 그냥 풀기가 싫습니다..
 *
 * 제가 물골드라 그런가봅니다.
 * 
 * 증가하는 수열과 감소하는 수열을 따로 구해봐야겠습니다.
 */

const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

// 증가 수열 (dp1[i]) 구하기
const dp1 = Array(n).fill(1); // i까지 증가하는 부분 수열의 길이
for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      dp1[i] = Math.max(dp1[i], dp1[j] + 1);
    }
  }
}

// 감소 수열 (dp2[i]) 구하기
const dp2 = Array(n).fill(1); // i부터 감소하는 부분 수열의 길이
for (let i = n - 1; i >= 0; i--) {
  for (let j = n - 1; j > i; j--) {
    if (arr[j] < arr[i]) {
      dp2[i] = Math.max(dp2[i], dp2[j] + 1);
    }
  }
}

// 바이토닉 수열의 최대 길이 구하기
let maxLength = 0;
for (let i = 0; i < n; i++) {
  maxLength = Math.max(maxLength, dp1[i] + dp2[i] - 1);
}

console.log(maxLength);
