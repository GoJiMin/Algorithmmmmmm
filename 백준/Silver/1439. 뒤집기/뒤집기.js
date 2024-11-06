const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 주어진 문자열은 0과 1로만 이루어짐.. 예제 1은 0001100
 * 이 때 연속된 하나 이상의 숫자를 잡고 뒤집을 수 있음.. 예를 들어, 000을 뒤집으면 1111100..
 * 모두 같은 숫자가 되도록 최소 횟수를 출력...
 * 우선 연속된 숫자 덩어리들을 확인.. [000, 11, 00] => 0 덩어리는 2개, 1 덩어리는 1개.
 * 그럼 1 덩어리만 뒤집으면 모두 같은 숫자가 나오겠군,,
 */

const total = {
  0: 0,
  1: 0,
};

let prevIdx = 0; // input[prevIdx] = "0"
let curIdx = 1; // input[curIdx] = "0"

while (prevIdx < input.length) {
  while (input[prevIdx] === input[curIdx]) curIdx++;

  total[input[prevIdx]]++;
  prevIdx = curIdx;
  curIdx++;
}

console.log(Math.min(...Object.values(total)));
