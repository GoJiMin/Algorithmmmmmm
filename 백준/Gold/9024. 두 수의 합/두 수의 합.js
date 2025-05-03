const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;

const T = Number(input[idx++]);

// [-7, -4, -3, -2, 0, 1, 2, 5, 9, 12];
/**
 * 이렇게 정렬된 배열이 있을 때, K가 4라면 가장 가까운 수의 조합은 5개다..
 * (-7, 12), (9, -4), (5, -2), (5, 0), (1, 2)
 *    5         5       3        5       3
 * 모두 K와의 차가 1이니까..
 *
 * 그럼 left, right 두 개의 포인터를 두고 두 포인터의 합과 K와의 차를 비교해서 카운트해줄까..?
 */
const result = [];
for (let t = 0; t < T; t++) {
  const [n, k] = input[idx++].split(' ').map(Number);
  const arr = input[idx++].split(' ').map(Number);

  arr.sort((a, b) => a - b);

  let minDiff = Infinity;
  let cnt = 0;

  let left = 0;
  let right = n - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    const diff = Math.abs(sum - k);

    /**
     * 지금까지 만났던 가장 작은 |k - sum| 보다 작다면 갱신함..
     * 만약 값이 같다면 같은 놈이니까 cnt 증가..
     */
    if (diff < minDiff) {
      minDiff = diff;
      cnt = 1;
    } else if (diff === minDiff) {
      cnt++;
    }

    if (sum > k) {
      right--;
    } else if (sum < k) {
      left++;
    } else {
      left++;
      right--;
    }
  }

  result.push(cnt);
}

console.log(result.join('\n'));
