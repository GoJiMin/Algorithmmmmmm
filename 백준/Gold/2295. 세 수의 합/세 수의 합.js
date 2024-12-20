const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 집합 A: { 2, 3, 5, 10, 18 }이 있습니다..
 * 이 중 3개의 수를 골랐을 때, 합이 집합에 포함된다고 합니다.
 *
 * A[i] + A[j] + A[k] = A[l]이 모두 집합에 포함된다는 거죠?.. 2 + 3 + 5 = 10은 모두 집합에 있는 수니까요..
 *
 * for(let i = 0 < n; i++)
 *  for(let j = 0; j < n; j++)
 *   for(let k = 0; k < n; k++)
 *    for(let l = 0; l < n; l++)
 *
 * 이렇게 4중 for문을 돌려서 풀 수 있겠죠..?..근데 N이 1000이면 절대 통과 못하니까 좀 바꿔서 생각해봅시다..
 *
 * 우선 집합에서 2개를 골라 미리 다 더해놓는다고 가정해봅시다.
 * (2, 3), (2, 5), (2, 10), (2, 18), ... (10 + 18)
 *
 * 그럼 식을 이렇게 변형할 수 있겠죠..? ij + A[k] = A[l], ij = A[l] - A[k]..
 * 집합의 두 수를 뺀 값이 미리 더한 값이 있는 배열에 있는지만 확인하면 되겠습니다..
 */

const n = Number(input[0]);

const arr = [];

for (let i = 1; i <= n; i++) {
  arr.push(Number(input[i]));
}

const sum_ij = [];

// x, y, z, k가 서로 같아도 된다는 조건이 있으니 i + i도 저장.
for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    sum_ij.push(arr[i] + arr[j]);
  }
}

// 이분탐색을 위한 정렬
sum_ij.sort((a, b) => a - b);

// [5, 7, 8, 12, 13, 15, 20, 21, 23, 28];
function binary(target) {
  let st = 0;
  let en = sum_ij.length - 1;

  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (sum_ij[mid] === target) {
      return true;
    }

    if (sum_ij[mid] > target) {
      en = mid - 1;
    } else {
      st = mid + 1;
    }
  }

  return false;
}

// 정렬하고 뒤에서부터 돌리면 찾자마자 종료해도 됨.
arr.sort((a, b) => a - b);

for (let i = n - 1; i > 0; i--) {
  for (let j = 0; j < i; j++) {
    if (binary(arr[i] - arr[j])) {
      console.log(arr[i]);
      return;
    }
  }
}
