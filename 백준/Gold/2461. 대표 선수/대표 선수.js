const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 우선 예제의 학생 능력치를 모두 정렬해놓고 생각해봅시다..
 * 다 뽑았을 때, 학생들의 최대 능력치와 최소 능력치의 차이가 최소가 되는 경우를 찾아야 돼요..
 *
 * 우선 모든 학급의 학생 수는 모두 동일합니다.. m으로 주어지는데요.
 *
 * 제가 일단 대충 생각해본 방법은 다음과 같은데요.
 * 우선 포인터 2개를 사용합니다..
 * st, en 포인터를 사용하는데요. 여기서 각 포인터는 현재 학급의 학생들의 최소, 최대 값을 지정하는 포인터로 동작합니다..
 * 그러니까 st, en이 0인 경우 min = max(classList[st][0], classList[st][1], classList[st][2]) 이렇게요.. 그럼 7이 나오겠죠?
 * 다음으로 max = max(classList[en][0], classList[en][1], classList[en][2]) => 14 =>
 *
 * 그럼 이 때 최소, 최대 능력치의 차이는 7이 나옵니다. => ans = min(ans, max - min)
 * 다음으로 en 포인터를 옮겨봅니다. en = 1
 * 그럼 min은 7인 상태겠죠?
 * 그럼 위의 동작을 또 거치면 max = 17이 나오겠죠?
 *
 * 일단 이거 취소. 이렇게 풀면 안되겠어요.
 *
 * 다음 방법 => 각 학급에서 누굴 골랐는지 추적한다?
 */

// [12, 16, 43, 67],
// [7, 17, 48, 68],
// [14, 15, 54, 77],

const [n, m] = input[0].split(" ").map(Number);

const classList = [];

for (let i = 1; i <= n; i++)
  classList.push(
    input[i]
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b)
  );

// i번째 팀이 고른 능력치를 저장할 인덱스..
const idx = Array(n).fill(0);

let ans = Number.MAX_SAFE_INTEGER;

while (true) {
  let mn = Number.MAX_SAFE_INTEGER;
  let mx = -1;

  let mntm = -1; // 현재 반복문 내에서 최솟값을 가진 팀의 인덱스..

  // i = 0, classList[0][0] = 12
  // mn = 12, mntm = 0
  // i = 1, classList[1][0] = 7
  // mn = 7, mntm = 1
  // i = 2, classList[2][0] = 14
  // 14 < 7 => mx = 14,
  // ans = 7 => idx[1] = 1

  // i = 0, classList[0][0] = 12
  // mn = 12, mntm = 0
  // i = 1, classList[1][1] = 17
  // 17 < 12 => mx = 17
  // i = 2, classList[2][0] = 14
  // 17 > 14 => mx = 17
  // ans = min(7, 17 - 12) => 5, idx[0] += 1

  // i = 0, classList[0][1] = 16
  // mn = 16, mx = 16, mntm = 0
  // i = 1, classList[1][1] = 17
  // mn = 16, mx = 17
  // i = 2, classList[2][0] = 14
  // pass
  // ans = min(5, 17 - 16) => 1, idx[0] += 1
  for (let i = 0; i < n; i++) {
    const val = classList[i][idx[i]];

    if (val < mn) {
      mn = val;
      mntm = i;
    }

    if (val > mx) {
      mx = val;
    }
  }

  ans = Math.min(ans, mx - mn);

  idx[mntm] += 1;

  if (idx[mntm] === m) break;
}

console.log(ans);
