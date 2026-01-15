const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 음 일단 예상 등수가 순서대로 주어진다는 것인데..
 *
 * 예상한 등수와 실제 등수를 A, B로 표현했을 때 |A - B|가 불만도라는 것이고..
 * 이 불만도가 최소가 될 수 있게 만들어달라는 것이죠..??
 *
 * 일단 이해는 했고, 예제 입력 1의 경우에
 * 1 5 3 1 2가 주어지는데.. 등수는 결국 N이 5면 1 2 3 4 5로 매겨져야 하고..
 *
 * 보면 1등이 2명이니 결국 한 명은 2등이 될테니 |1 - 2| 불만도 1적립..
 * 다음으로 그럼 2등이 2명이 되니 한 명은 3등이 될테니 |2 - 3| 불만도 1적립..
 * 다음으로 그럼 또 3등이 2명이 되니 한 명은 4등이 될테니 |3 - 4| 불만도 1적립..
 * 마지막 5등은 그냥 5등이 되니 끝..
 *
 * 이래서 불만도 3이 최선인 거 같은데..??
 *
 * 그럼 이런 결과를 어떻게 만들 수 있을까?
 * 등수를 1부터 N까지 순서대로 매긴다고 가정했을 때,
 * 현재 매겨야 하는 등수에 예상한 사람이 얼마나 있는지 알 수 있으면 좋을 거 같음..
 *
 * 정렬?
 */

const n = Number(input[0]);

const arr = [];
for (let i = 1; i <= n; i++) arr.push(Number(input[i]));

arr.sort((a, b) => a - b);

let currentRank = 1;
let result = 0n;

for (let i = 0; i < n; i++) {
  // 만약 현재 매길 등수와 예상 등수가 같다면 패스
  if (currentRank === arr[i]) {
    currentRank++;
    continue;
  } else {
    // 만약 예상 등수와 차이가 난다면? 그럼 불만도 적립하고 예상 등수 올려서 넘기기?
    const abs = Math.abs(currentRank - arr[i]);
    result += BigInt(abs);
    currentRank++;
  }
}

console.log(result.toString());
