const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 100 400 300 100 500 101 400
 *
 * 1일차 100원 필요함 500원 인출 => 100원 쓰고 400원 남음 | total = 1
 * 2일차 400원 필요함 0원 인출 => 400원 쓰고 0원 남음 | total = 1
 * 3일차 300원 필요함 500원 인출 => 300원 쓰고 200원 남음 | total = 2
 * 4일차 100원 필요함 0원 인출 => 100원 쓰고 100원 남음 | total = 2
 * 5일차 500원 필요함 100원 넣고 500원 인출 => 500원 쓰고 0원 남음 | total = 3
 * 6일차 101원 필요함 500원 인출 => 101원 쓰고 399원 남음 | total = 4
 * 7일차 400원 필요함 399원 넣고 500원 인출 => total = 5
 */

const [n, m] = input[0].split(' ').map(Number);
const arr = [];

for (let i = 1; i <= n; i++) arr.push(Number(input[i]));
const max = Math.max(...arr);
const sum = arr.reduce((acc, cur) => acc + cur, 0);

function check(x) {
  // 처음에 한 번 인출함.
  let cnt = 1;
  let cur = x; // x만큼
  for (let i = 0; i < n; i++) {
    /**
     * cur은 현재 소지금.
     * 현재 소지금에서 i번째 요일에 필요한 금액을 뺀 값이 0 이하라면 다시 넣고 출금함.
     */
    if (cur - arr[i] < 0) {
      cnt++;
      cur = x - arr[i];
    } else {
      cur -= arr[i];
    }
  }

  // 어차피 cnt가 m 이하로만 잡히면 돈 남는 거 넣었다 빼면 되니까 true 리턴
  return cnt <= m;
}

let lo = max;
let hi = sum;

let ans = 0;
while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);

  if (check(mid)) {
    hi = mid - 1;
    ans = mid;
  } else {
    lo = mid + 1;
  }
}

console.log(ans);
