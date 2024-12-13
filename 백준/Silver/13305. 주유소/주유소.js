const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 그리디 문제네요.. 탐욕적이게 풀으랍니다.. 실버 3이라 난이도가 굉장히 쉽네요..
 * 방금까지 누적합 풀다가 이거 푸니까 너무 쉬워졌습니다.
 *
 * 자 일단, 가격이 가장 싼 곳에서 주유를 많이 해야 비용이 가장 적게 들겠죠??
 * 앞으로 나아갈 때 현재 저장된 최소 가격을 유지하고, 더 싼 곳이 있으면 갱신하고 주유하면 되곘죠??
 */

const n = Number(input[0]);

const dists = input[1].split(" ").map(BigInt);
const prices = input[2].split(" ").map(BigInt);

let minPrice = prices[0]; // 우선 첫 번째 주유소에선 무조건 주유를 해야만 합니다..
let totalCost = 0n;

// 제일 마지막 도시는 어차피 방문할 필요가 없죠??
for (let i = 0; i < n - 1; i++) {
  minPrice = minPrice < prices[i] ? minPrice : prices[i]; // 더 싼 주유소가 생긴다면 갱신.

  /**
   * 만약 위에서 minPrice가 갱신되지 않는다면, 우리는 이전에 주유소에서 더 주유할 것으로 가정합니다.
   *  2 3 1
   * 5 2 4 1
   *
   * 위와 같은 상황에서 처음 주유소에서 dist[i]인 2만큼 주유하게 됩니다.
   * 그 뒤에 cost 2인 주유소에서 3만큼 주유를 한 뒤 떠납니다.
   * 다음 주유소의 가격은 4입니다. 더 비싸죠? 그럼 갱신하지 않습니다.
   *
   * 그럼 이 때, 우리는 가격이 2인 주유소에서 1만큼 더 주유한다는 것입니다..
   */
  totalCost += minPrice * dists[i];
}

console.log(totalCost.toString());
