const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 대놓고 슬라이딩 윈도우 문제 아닙니까?..
 *
 * 초기 윈도우 x개 만큼 설정해놓고 밀어봅시다.
 */

const [n, x] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let cntVisitors = 0;
let maxVisitors = 0;
let cntPeriod = 1;

for (let i = 0; i < x; i++) {
  cntVisitors += arr[i];
  maxVisitors += arr[i];
}

let left = 0;
let right = x;

while (right < n) {
  cntVisitors -= arr[left];
  cntVisitors += arr[right];

  if (cntVisitors === maxVisitors) {
    cntPeriod++;
  } else if (cntVisitors > maxVisitors) {
    maxVisitors = cntVisitors;
    cntPeriod = 1;
  }

  left++;
  right++;
}

if (cntVisitors === 0) {
  console.log("SAD");
} else {
  console.log(maxVisitors + "\n" + cntPeriod);
}
