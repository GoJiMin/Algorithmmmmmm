const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// 메모리 제한에 걸릴지 모르겠습니다..
// 살짝 날로 먹는 느낌이긴 한데, DP가 원래 그런 거 아닙니까? 그냥 생각한 거 컴퓨터가 알아서 돌리는 거니까..
// 엄청 간단한게 기존 LIS의 길이를 구하는 코드를 좀 변형 시켜서 테이블 자체에 수열을 집어넣는데 일단 제출해보겠습니다..

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const dp = Array.from({ length: n }, (_, i) => [arr[i]]);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i] && dp[j].length + 1 > dp[i].length) {
      dp[i] = [...dp[j], arr[i]];
    }
  }
}

dp.sort((a, b) => b.length - a.length);

console.log(dp[0].length + "\n" + dp[0].join(" "));
