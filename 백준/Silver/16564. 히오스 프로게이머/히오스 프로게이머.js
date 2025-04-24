const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음.. 목표 값인 target을 이분탐색으로 정하고 각 캐릭터 레벨을 target까지 올린 합이 K 이하인지 판단하면 될듯..?
 */

const [n, k] = input[0].split(' ').map(Number);

const levels = [];
for (let i = 1; i <= n; i++) levels.push(Number(input[i]));

let lo = Math.min(...levels);
let hi = lo + k;
let ans = lo;

function bs(target) {
  let needed = 0;

  for (let i = 0; i < n; i++) {
    if (levels[i] < target) {
      needed += target - levels[i];
      // 총합 레벨을 넘긴다면 불가능함..
      if (needed > k) return false;
    }
  }

  return true;
}

while (lo <= hi) {
  const mid = Math.floor((lo + hi) / 2);

  if (bs(mid)) {
    ans = mid;
    lo = mid + 1;
  } else {
    hi = mid - 1;
  }
}

console.log(ans);
