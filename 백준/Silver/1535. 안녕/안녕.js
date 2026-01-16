const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음...
 *
 * 필요한 정보만 추려봅시다.
 *
 * 초기 체력을 h, 총 점수를 s라고 했을 때,
 * i번 사람에게 인사를 하면
 * h -= L[i] => 하지만 0이하로 떨어지면 안됨.
 * s += J[i]
 *
 * s가 최대가 되도록 구현..
 *
 * 그냥 전형적인 배낭 문제 같습니다..
 */

const n = Number(input[0]);
const costs = input[1].split(' ').map(Number);
const joys = input[2].split(' ').map(Number);

const maxCost = 99; // 0이하면 죽으니까 99로 설정
const dp = Array(maxCost + 1).fill(0); // 각 체력마다 최댓값 저장

for (let i = 0; i < n; i++) {
  const cost = costs[i];
  const joy = joys[i];

  // 99부터 시작하고, 현재 닳는 체력까지만 감소시키면서 반복
  // 어차피 N = 20, maxCost = 99면 2초 내로 충분히 들어옴
  for (let h = maxCost; h >= cost; h--) {
    dp[h] = Math.max(dp[h], dp[h - cost] + joy);
  }
}

console.log(Math.max(...dp));
