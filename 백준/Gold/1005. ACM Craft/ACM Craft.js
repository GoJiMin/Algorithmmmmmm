const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const t = Number(input[0]);

let idx = 1;

const result = [];
for (let i = 0; i < t; i++) {
  const [n, k] = input[idx++].split(" ").map(Number);
  const arr_d = input[idx++].split(" ").map(Number);

  const dp = Array(n + 1).fill(-1);

  const adj = Array.from({ length: n + 1 }, () => []);

  for (let i = 0; i < k; i++) {
    const [v, u] = input[idx++].split(" ").map(Number);

    // 방향 그래프일듯? 2번이 건설되려면 1번이 건설되어야만 한다.. 이런 느낌이니까
    adj[u].push(v);
  }

  const target = Number(input[idx++]);

  function dfs(v) {
    // 이미 해당 노드에 계산된 값이 있으면 바로 반환하기.
    if (dp[v] !== -1) return dp[v];

    // 만약 이어진 그래프가 없으면 그냥 자기 자신이 건설 시간임.
    if (adj[v].length === 0) {
      dp[v] = arr_d[v - 1];

      return dp[v];
    }

    let maxPre = 0;
    // 동시 건설이 가능하니까 max 처리
    for (const nxt of adj[v]) maxPre = Math.max(maxPre, dfs(nxt));

    dp[v] = arr_d[v - 1] + maxPre;

    return dp[v];
  }

  result.push(dfs(target));
}

console.log(result.join("\n"));
