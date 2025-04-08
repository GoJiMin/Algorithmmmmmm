const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 배열 정렬해놓고..
 * 포인터 2개? (left, right)
 *
 * 가장 가벼운 무게를 가장 무거운 무게와 매칭 시켰을 때 k 이상이라면 left + 1번 인덱스도 당연히 right 인덱스와
 * 매칭할 수 없음..
 * 그럼 left를 두고 right을 왼쪽으로 이동시키면서 매칭시키는 방법으로?
 */

const [n, k] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);

arr.sort((a, b) => a - b);

let left = 0;
let right = n - 1;

let ans = 0;
while (left < right) {
  const sum = arr[left] + arr[right];

  // 고양이를 무릎에 올릴 수 있다.
  if (sum <= k) {
    ans++;
    left++;
    right--;
  } else {
    right--;
  }
}

console.log(ans);
