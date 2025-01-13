const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 오늘은 오랜만에 백트래킹 ..
 * 솔직히 요즘 DP랑 이분탐색, 시뮬레이션 문제만 건들다가 풀어보려니까 가물가물하네요..
 * 쉬운 문제부터 좀 건들고 골드까지만 다시 풀어봐야겠습니다..
 *
 * 우선 n의 최대가 8이라 솔직히 완전탐색으로 풀어도 될 거 같은데요..
 * 문제를 보면 이미 선택한 값은 그 뒤로 더이상 선택하지 않는 거 같은데..
 */

// Base Case는 2?
/**
 * 생각해봅시다.. 예제 1의 경우 주어지는 배열은 다음과 같은데요?
 * 20 1 15 8 4 10
 *
 * 20을 선택하고 모든 수를 탐색합니다. 20 - 1, 20 - 15, 20 - 8, 20 - 4, 20 - 10
 * 이렇게 탐색해 절대값이 가장 큰 값을 누적시키며 인덱스를 증가시키면 되겠는데요..
 *
 * 와 ~~~ 젠젠 잘못 풀었네요~~~
 * 이게 아니고 배열에 들어있는 수를 계산하는 식은 항상 똑같구용. 순서만 알아서 바꾸는 거였네요..
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const isUsed = Array(n).fill(false);
const current = [];

let maxSum = 0;

function calculate(arr) {
  let sum = 0;

  for (let i = 0; i < n - 1; i++) {
    sum += Math.abs(arr[i] - arr[i + 1]);
  }

  return sum;
}

function bt(k) {
  if (k === n) {
    maxSum = Math.max(calculate(current), maxSum);

    return;
  }

  for (let i = 0; i < n; i++) {
    if (!isUsed[i]) {
      isUsed[i] = true;
      current[k] = arr[i];
      bt(k + 1);
      isUsed[i] = false;
    }
  }
}

bt(0);

console.log(maxSum);
