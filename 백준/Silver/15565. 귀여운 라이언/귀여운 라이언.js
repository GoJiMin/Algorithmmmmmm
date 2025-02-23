const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 투포인터, 슬라이딩 윈도우 문제 같은데요..
 *
 * 우선 1을 포함한 연속된 집합의 크기 중 가장 작은 크기를 구하라는 거 같은데..
 *
 * 생각해본 방법은 cnt 변수를 두고, 1의 개수를 누적해 k개가 됐을 때, 길이를 갱신해줄까요?
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let en = 0;
let cnt = arr[en] === 1 ? 1 : 0;

let ans = Number.MAX_SAFE_INTEGER;
for (let st = 0; st < n; st++) {
  while (en < n && cnt < k) {
    en++;

    if (arr[en] === 1) cnt++;
  }

  if (cnt === k) ans = Math.min(ans, en - st + 1);
  if (arr[st] === 1) cnt--;
}

if (ans === Number.MAX_SAFE_INTEGER) {
  console.log(-1);
} else {
  console.log(ans);
}
