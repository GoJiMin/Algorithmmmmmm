const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim();

/**
 * 재밌는 이분탐색 문제네요.
 *
 * 우선 (y * 100) / x을 해주면 퍼센트를 구할 수 있는데요.
 * 문제에서 절~대 지지 않는다고 나와있어요. 그럼 간단하겠는데요.
 *
 * 퍼센트가 변할 수 있는 최소값은 1, 최악의 경우 2_000_000_000번까지 게임을 해야겠죠?
 * 그럼 st, en이 나왔네요.. 이제 mid 값을 x, y에 더해서 값을 찾아주면 될 거 같아요.
 */

const [x, y] = input.split(" ").map(Number);

const initialValue = Math.floor((y * 100) / x);

// 승률이 99 이상이면 절대 안 변합니다..
if (initialValue >= 99) {
  console.log(-1);
  process.exit();
}

const MAX = 2_000_000_000;
let st = 1;
let en = MAX;

let ans = 0;

while (st <= en) {
  const mid = Math.floor((st + en) / 2);
  const currentValue = Math.floor(((y + mid) * 100) / (x + mid));

  if (initialValue < currentValue) {
    en = mid - 1;
    ans = mid;
  } else {
    st = mid + 1;
  }
}

console.log(ans);
