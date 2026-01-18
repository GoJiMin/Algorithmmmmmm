const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * 음.. 일단 어떤 도시에서 비용을 지불하면 고객이 늘어난다는 거 같네요..
 *
 * 결국 최소한의 비용을 들여서 C만큼의 고객을 확보하고 싶은 건데..
 * 도시마다 소모되는 비용과 대비해서 확보할 수 있는 고객의 양이 정해져 있습니다.
 *
 * 그리고 적어도 C명을 확보하기 위한 최소 비용을 구하는게 좀 열받는데..
 *
 * i명을 모으기 위한 최소 비용을 누적시켜서 bottom-up으로 풀어야 할 거 같습니다..
 *
 * dp[i] = i명을 확보하기 위한 최소 비용? 그럼 점화식은
 * dp[i] = min(dp[i], dp[i - 고객수] + 비용)
 */

const [C, N] = input[0].split(' ').map(Number);

const towns = [];
for (let i = 1; i <= N; i++) {
  towns.push(input[i].split(' ').map(Number));
}

// 한번 홍보할 때 최대 100명까지 들어오니까 오차 범위 포함하기
const maxCustomers = C + 100;
const dp = Array(maxCustomers + 1).fill(Infinity);

dp[0] = 0;

for (const [cost, customers] of towns) {
  for (let i = customers; i <= maxCustomers; i++) {
    dp[i] = Math.min(dp[i], dp[i - customers] + cost);
  }
}

// 적어도 C명이니까 C명부터 최소 비용 싹 돌리기
let minCost = Infinity;
for (let i = C; i <= maxCustomers; i++) {
  minCost = Math.min(dp[i], minCost);
}

console.log(minCost);
