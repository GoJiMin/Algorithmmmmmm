const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * N은 2000으로 2중 for문까지는 괜찮을 거 같습니다..
 *
 * 어떤 수 x가 배열의 두 수의 합으로 이루어져 있으면 GOOD이라네요~
 *
 * 그럼 2중 for문 내부에서 arr[i] - arr[j] 값을 이분 탐색을 사용해 찾아보면 될듯하네요..
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

function lower_bound(target) {
  let st = 0;
  let en = n - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (arr[mid] >= target) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return st;
}

let cnt = 0;

function find(i) {
  for (let j = 0; j < n; j++) {
    if (i === j) continue;

    const x = arr[i] - arr[j];
    let idx = lower_bound(x);

    /**
     * [0, 0, 0]일 때 lower_bound는 가장 처음 0을 반환한다.
     * 그럼 idx를 n보다 작으며 찾고자 하는 값일 때, 계속 증가시키며 탐색해야만 함.
     *
     * while문 없이 단순히 if (idx !== i && idx !== j && arr[idx] === x) 이렇게 판단하면
     * 답이 3이 아닌 2가 나옴.
     */
    while (idx < n && arr[idx] === x) {
      if (idx !== i && idx !== j) {
        cnt++;
        return;
      }

      idx++;
    }
  }
}

for (let i = 0; i < n; i++) find(i);

console.log(cnt);
