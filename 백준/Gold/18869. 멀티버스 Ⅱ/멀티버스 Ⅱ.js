const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 좌표 압축 문제입니다.
 *
 * 그냥 좌표 전부 압축해버리고 비교해서 다르면 false, 맞으면 true 반환시켜서 카운트하면 되겠는데요??
 *
 * 예제 입력 1의 경우
 * 1 3 2
 * 12 50 31
 * 입니다. 그냥 크기 순으로 0, 1, 2로 압축하면 이렇게 압축됩니다.
 *
 * 0 2 1
 * 0 2 1
 * 둘은 같은 우주입니다.
 *
 * 예제 입력 2의 경우
 * 1 3 2
 * 12 50 10
 * 입니다. 또 압축해보면?
 *
 * 0 2 1
 * 1 2 0
 * 둘은 다른 우주네요
 *
 * 예제 입력 3의 경우는 바로 압축해보면?
 * 1 0 2
 * 0 1 2
 * 2 0 1
 * 0 1 2
 * 1 0 2
 * (1, 5), (2, 4)는 같은 우주네요.
 *
 * 우선 위와 같이 좌표를 압축하기 위해선 정렬이 필요하겠죠? 정렬하고 해당 인덱스를 저장하면 될 거 같은데요.
 */

// m = 우주의 개수, n = 우주에 있는 행성의 개수
const [m, n] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i <= m; i++) {
  arr.push(input[i].split(" ").map(Number));
}

function lower_bound(arr, target, len) {
  let st = 0;
  let en = len - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (target <= arr[mid]) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

function compress(arr) {
  const sorted = [...new Set(arr)].sort((a, b) => a - b);

  const result = [];

  for (let i = 0; i < n; i++) {
    result[i] = lower_bound(sorted, arr[i], sorted.length);
  }

  return result;
}

function compare(arrA, arrB) {
  for (let i = 0; i < n; i++) {
    if (arrA[i] !== arrB[i]) return false;
  }

  return true;
}

const compressed = arr.map(compress);

let cnt = 0;

for (let i = 0; i < m - 1; i++) {
  for (let j = i + 1; j < m; j++) {
    if (compare(compressed[i], compressed[j])) cnt++;
  }
}

console.log(cnt);
