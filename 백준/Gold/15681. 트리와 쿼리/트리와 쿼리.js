const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;

const [n, r, q] = input[idx++].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < n - 1; i++) {
  const [u, v] = input[idx++].split(" ").map(Number);

  adj[u].push(v);
  adj[v].push(u);
}

// dp[v]는 정점 v를 루트로 가진 서브트리의 정점 수
const dp = Array(n + 1).fill(0);

function dfs(v, parent) {
  dp[v] = 1; // 자기 자신을 포함

  // 연결된 모든 정점 탐색하기..
  for (const nxt of adj[v]) {
    if (nxt === parent) continue; // 부모 노드로는 다시 돌아가지 않음
    dfs(nxt, v); // 자식 노드를 먼저 탐색함
    dp[v] += dp[nxt]; // 자식 노드 탐색 끝나면 현재 정점 인덱스에 추가하기
  }
}

dfs(r, -1);

const result = [];
for (let i = 0; i < q; i++) {
  const query = Number(input[idx++]);

  result.push(dp[query]);
}

console.log(result.join("\n"));
