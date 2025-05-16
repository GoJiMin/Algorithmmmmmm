const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 두 번째 줄에 각 포트가 연결될 번호가 주어지는데요..
 *
 * 생각해보면 각 포트가 꼬이지 않으려면 이전에 나온 번호보다 커야겠죠..? 번호가 작다면 선이 위로 연결되니 꼬일테니까요..
 * 그럼 가장 긴 증가하는 부분 수열 문제라고 보면 될 거 같아요..
 */

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);

// 이건 DP 풀이.. 실행시간이 너무 많이 나와서 이분탐색으로 다시 풀기..
// const dp = Array(n).fill(1);

// for (let i = 0; i < n; i++) {
//   for (let j = 0; j < i; j++) {
//     if (arr[j] < arr[i]) {
//       dp[i] = Math.max(dp[i], dp[j] + 1);
//     }
//   }
// }

// console.log(Math.max(...dp));

const LIS = [];
for (let i = 0; i < n; i++) {
  const x = arr[i];

  // 최장 수열이 비어있거나 마지막 값이 x 보다 작으면 바로 넣어주기
  if (LIS.length === 0 || LIS.at(-1) < x) {
    LIS.push(x);
    continue;
  }

  let st = 0;
  let en = LIS.length - 1;

  let pos;
  while (st <= en) {
    const mid = Math.floor((st + en) / 2);

    if (x <= LIS[mid]) {
      // x가 들어갈 위치 찾아주기
      en = mid - 1;
      pos = mid;
    } else {
      st = mid + 1;
    }
  }

  LIS[pos] = x;
}

console.log(LIS.length);
