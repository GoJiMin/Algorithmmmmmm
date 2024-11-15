const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 다음 이분 탐색 문제입니다..
 * 근데 문제 읽어보면 그냥 해시 쓰고 싶은데 먼저 풀어보고 해시로 풀어보겠습니다..
 * 이번엔 이전 문제와 비슷하나, 이번엔 등장 횟수를 구하라고 합니다.
 *
 * 그럼 이번엔 최초로 등장하는 인덱스와 가장 마지막에 등장하는 인덱스를 구하면, 등장 횟수를 구할 수 있겠네요.
 */

const n = Number(input[0]);
const arrN = input[1].split(" ").map(Number);

const m = Number(input[2]);
const arrM = input[3].split(" ").map(Number);

// 정렬하기..
arrN.sort((a, b) => a - b);

function lower_idx(target, len) {
  let st = 0;
  let en = len;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);

    if (arrN[mid] >= target) en = mid;
    else st = mid + 1;
  }

  return st;
}

function upper_idx(target, len) {
  let st = 0;
  let en = len;

  while (st < en) {
    const mid = Math.floor((st + en) / 2);

    // lower 함수에서는 이하일 때 en을 mid로 변경했죠..?
    // 가장 오른쪽 인덱스를 구하고 싶다면 값이 작을 때 변경해야만 합니다.
    /**
     * 0 1 2  3  4  5  6  7  8  9 10
     * 2 4 6 10 10 16 16 16 30 32
     *       st mid en
     * 이라고 가정했을 때 mid가 target인 10과 같을 때 st를 증가시키면 가장 마지막 인덱스를 찾겠고
     * 반대로 10이하일 때 en을 mid로 변경한다면 반복문이 한번 더 돌고 가장 왼쪽 인덱스를 찾겠죠..?
     */
    if (arrN[mid] > target) en = mid;
    else st = mid + 1;
  }

  return st;
}

const result = [];
for (let i = 0; i < m; i++) {
  const lidx = lower_idx(arrM[i], n);
  const ridx = upper_idx(arrM[i], n);

  result.push(ridx - lidx);
}

console.log(result.join(" "));
