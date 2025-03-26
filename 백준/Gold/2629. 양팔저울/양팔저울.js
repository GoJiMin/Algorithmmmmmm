const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const n = Number(input[0]);
const weights = input[1].split(' ').map(Number);

const m = Number(input[2]);
const balls = input[3].split(' ').map(Number);

const maxWeight = weights.reduce((acc, cur) => acc + cur, 0);
let dp = Array(maxWeight + 1).fill(false);
dp[0] = true; // 아무것도 올리지 않았을 때

for (let i = 0; i < n; i++) {
  const w = weights[i];
  const curTable = dp.slice(); // 이번 무게추로 측정 가능한 무게 테이블

  for (let diff = 0; diff <= maxWeight; diff++) {
    if (dp[diff]) {
      if (diff + w <= maxWeight) curTable[diff + w] = true;
      // 현재 무게에서 반대쪽에 조회하는 무게추를 올려서 측정이 가능하니까..
      // diff = 1일 때 무게추 4를 반대쪽으로 올리면 무게 3을 측정할 수 있음.
      curTable[Math.abs(diff - w)] = true;
    }
  }

  dp = curTable;
}

const result = [];
for (let i = 0; i < m; i++) {
  const ball = balls[i];

  if (ball > maxWeight) result.push('N');
  else dp[ball] ? result.push('Y') : result.push('N');
}

console.log(result.join(' '));
