const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이거 이분탐색으로 풀었던 거 같은데, 다른 문제인가??
 *
 * 우선 투 포인터로 풀기 위해서 포인터 2개 놔야겠죠?
 * 먼저 용액을 정렬해두고, left 포인터는 0, right 포인터는 n - 1로 지정하면 될 거 같은데요.
 *
 * 정렬된 용액은 어떻게 생겼을까요?
 * -99, -2, -1, 4, 98 이렇게 생겼는데요..
 *
 * 그럼 처음에 -99 + 98로 -1의 용액이 만들어집니다.
 * 그럼 이제 포인터를 어떻게 움직일까요?
 *
 * 우선 생각해봅시다.. 두 용액을 더했을 때, 합이 음수라면 left, right 둘 중 어떤 포인터가 움직여야 할까요?
 * 오름차순으로 정렬된 배열임을 고려해봅시다.
 *
 * left가 오른쪽으로 움직여야겠죠? 두 포인터는 각각 left는 가장 작은 쪽의 용액, right는 가장 큰 쪽의 용액을 가리키죠?
 * 그럼 left가 오른쪽으로 움직인다는 것은 조금 더 큰 용액을 섞는다는 의미니까요..
 */

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

let left = 0;
let right = n - 1;

let bestSum = arr[left] + arr[right];
let bestPair = [arr[left], arr[right]];

// 교차하면 끝내기..
while (left < right) {
  const sum = arr[left] + arr[right];

  // 절대값이 더 작을수록 용액의 차가 적다는 의미죠? -4, 5를 비교했을 때, -4쪽이 차가 더 작으니까요..
  if (Math.abs(sum) < Math.abs(bestSum)) {
    bestSum = sum;
    bestPair = [arr[left], arr[right]];
  }

  if (sum === 0) {
    break; // 0이 되는 용액을 찾으면, 더 찾을 필요가 없죠?
  } else if (sum < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(bestPair.join(" "));
