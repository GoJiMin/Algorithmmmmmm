const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이분 탐색을 활용한 문제 같습니다..만.. 생각하기가 좀 어렵네요..
 *
 * 우선 블루레이의 최대 개수가 주어집니다. 약간 그리디도 써야되는 거 같은데..
 * 우선 최소한 가장 긴 강의는 담을 수 있어야되니 st 값은 가장 긴 강의 값.
 * en 값은 블루레이의 수가 1로 주어질 경우 하나에 모두 담아야되니 모두 더한 값으로 설정해야될 거 같습니다.
 *
 * 그리고 mid 값을 st + en / 2로 구해서 이 mid 값이 초과되지 않는 선까지 모두 하나의 블루레이에 담고,
 * 초과되면 블루레이를 증가시켜서 m이하라면 업데이트하는식으로..? 짜야겠네요..
 */

const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let st = Math.max(...arr);
let en = arr.reduce((acc, cur) => acc + cur, 0);

while (st <= en) {
  const mid = Math.floor((st + en) / 2);

  let bluray = 1;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    // 현재 블루레이에 담길 수 있다면.
    if (sum + arr[i] <= mid) {
      sum += arr[i];
    } else {
      // 아니라면 블루레이를 하나 더 추가.
      bluray++;
      sum = arr[i];
    }
  }

  // 최종적으로 블루레이의 개수가 m개 이하라면 en을 더 줄여도 됨.
  if (bluray <= m) {
    en = mid - 1;
  } else {
    st = mid + 1;
  }
}

// 가능한 값 중에서 가장 작은 크기를 찾는...방법.. 즉 lower_bound.. st 값을 출력..
console.log(st);
