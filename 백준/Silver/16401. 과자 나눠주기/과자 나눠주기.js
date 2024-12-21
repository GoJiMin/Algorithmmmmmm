const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이번 문제는 약간 랜선 자르기 느낌이네요.. 매개 변수 탐색이라고 하던가요..?
 *
 * 우선 첫째 줄에 조카의 수 M, 과자의 수 N이 주어집니다..
 *
 * 조카놈들이 하나라도 과자 길이가 다르면 아주 불같이 화를 낸다고 합니다..
 * 우선 과자는 나눠질 수 있습니다. 단, 다시 붙일 수는 없다네요.
 */

const [m, n] = input[0].split(" ").map(Number);
const sticks = input[1].split(" ").map(Number);

/**
 * en 값을 sticks[n - 1]로 설정한 이유가 뭐게요 ~ ?
 * 아~ 정답은 조카가 1명이면 마지막 과자 주는게 최대값이니까요~
 */

sticks.sort((a, b) => a - b);

let st = 1;
let en = sticks[n - 1];

let ans = 0;

while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let cnt = 0;

  sticks.forEach((stick) => {
    const broke = Math.floor(stick / mid);

    cnt += broke;
  });

  if (m <= cnt) {
    ans = mid;
    st = mid + 1;
  } else {
    en = mid - 1;
  }
}

// 코드 짜놓고 보니까 이거 그냥 랜선 자르기랑 똑같네요..
console.log(ans);
