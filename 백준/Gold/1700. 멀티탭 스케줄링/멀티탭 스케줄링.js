const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

// 2 3 2 1 4 1 7

/**
 * 1. 멀티탭에 비어있으면 바로 꽂음..
 * 2. 멀티탭에 빈자리가 없다면 미래에 사용하지 않는 플러그를 우선 제거함..
 * 3. 혹은 사용한다면 가장 먼 미래에 사용하는 플러그를 제거함..
 *
 *
 * 3번은 왜? 일까요...
 * n = 2로 2구 멀티탭이라고 가정하고, 2 3 1 1 3 3 2 이렇게 사용한다고 가정해봅시다.
 *
 * 최적의 사용 방법은 다음과 같습니다.
 * 2 꽂음 => 3 꽂음 => 2 제거 후 1 꽂음 => 1 사용 => 3 사용 => 3 사용 => 아무거나 제거 후 2 꽂음 = 플러그 2번 뽑음.
 *
 * 하지만 가장 먼 플러그가 아닌 경우라면요?
 * 2 꽂음 => 3 꽂음 => 3 제거 후 1 꽂음 => 1 사용 => 2 제거 후 3 꽂음 => 3 사용 => 아무거나 제거 후 2 꽂음 = 플러그 3번 뽑음.
 *
 * 이니까요.. 그 사이에 더 효율적으로 사용하기 위해선 가장 먼 플러그를 제거해야겠네요.
 */

const [n, k] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let cnt = 0;
let ans = 0;

const pluggedMap = new Map();

// 2 3 2 3 1 2 7

for (let i = 0; i < k; i++) {
  const cur = arr[i];

  // 이미 꽂혀 있으면 continue..
  if (pluggedMap.has(cur)) continue;

  if (cnt < n) {
    // n개만큼 사용 중이지 않다면 바로 꽂음..
    pluggedMap.set(cur);
    cnt++;

    continue;
  } else {
    const loc = [];

    for (const plugged of pluggedMap.keys()) {
      let idx = -1;
      // 멀티탭에 꽂힌 전자기기가 가장 먼저 등장하는 위치를 업데이트.
      for (let j = i + 1; j < k; j++) {
        if (arr[j] === plugged) {
          idx = j;
          break;
        }
      }

      loc.push([plugged, idx]);
    }

    // [ [2, 5], [3, -1] ]
    loc.sort((A, B) => A[1] - B[1]);

    // 오름차순 정렬의 첫 번째 인덱스의 idx 값이 -1이면 미래에 사용하지 않으니 빼버림.
    if (loc[0][1] === -1) {
      pluggedMap.delete(loc[0][0]);
    } else {
      pluggedMap.delete(loc.at(-1)[0]);
    }

    pluggedMap.set(cur);
    ans++;
  }
}

console.log(ans);
