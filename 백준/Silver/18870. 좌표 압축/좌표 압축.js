const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 주어진 X보다 작은 좌표가 몇 개인지 출력해야됩니다..
 * [2, 4, -10, 4, -9]라면 2보다 작은 -10, -9 2개.. 이런식으로..
 * -10^9 ≤ Xi ≤ 10^9 범위가 상당합니다.
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

// X는 오름차순으로 정렬된 배열에서 인덱스가 증가하며 주어지도록 정렬한다.
// 그리고 본인보다 작은 좌표가 몇 개인지 출력해야되니까 중복을 제거한다.
const duplicatedArr = [...arr].sort((a, b) => a - b);
const deDuplicatedArr = [];

let idx = 0;

// 내가 지금 참조하는 인덱스의 값에서 다음 인덱스가 다른 값일 때까지 idx를 증가..
while (idx < n) {
  const cur = duplicatedArr[idx];

  while (cur === duplicatedArr[idx]) {
    idx++;
  }

  deDuplicatedArr.push(cur);
}

// 정렬 + 중복이 제거된 배열에 이분탐색 시작..
// 정렬된 배열에서 찾은 인덱스는 말그대로 오름차순으로 정렬된 인덱스라 순서 그 자체..
function binary_search(target, len) {
  let st = 0;
  let en = len;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (deDuplicatedArr[mid] === target) return mid;

    if (deDuplicatedArr[mid] > target) en = mid - 1;
    else st = mid + 1;
  }

  return 0;
}

const result = [];

for (let i = 0; i < n; i++) {
  // arr[i]의 인덱스를 찾는다.
  const idx = binary_search(arr[i], deDuplicatedArr.length);

  result.push(idx);
}

console.log(result.join(" "));
