const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);

const costs = [];

for (let i = 1; i <= n; i++) costs.push(input[i].split(" ").map(Number));

const isUsed = Array(n).fill(false);

let minCost = Number.MAX_SAFE_INTEGER;

// k: 방문한 도시 수
// sum: 지금까지 누적된 비용
// idx: 현재 도시
function bt(k, sum, idx) {
  // Base Case..
  if (k === n) {
    // 모두 방문하고 원래 도시로 돌아갈 때 길이 있으면..
    if (costs[idx][0] !== 0) minCost = Math.min(minCost, sum + costs[idx][0]);

    return;
  }

  for (let j = 0; j < n; j++) {
    // 아직 방문 안 했고, 길이 있으면..
    if (!isUsed[j] && costs[idx][j] !== 0) {
      isUsed[j] = true;
      bt(k + 1, sum + costs[idx][j], j);
      isUsed[j] = false;
    }
  }
}

isUsed[0] = true;
bt(1, 0, 0);

console.log(minCost);