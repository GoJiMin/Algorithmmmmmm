const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 이분 그래프란, 그래프의 모든 정점들이 두 그룹으로 나뉘는 것..
 * 같은 그룹의 정점들간에는 간선이 존재하면 안된다..
 *
 * 그럼 같은 그룹인지는 문자열로? 아니면 -1, 1?
 */

const t = Number(input[0]);

let idx = 1;

const result = [];
for (let test = 0; test < t; test++) {
  const [n, m] = input[idx++].split(" ").map(Number);

  const adj = Array.from({ length: n + 1 }, () => []);
  const group = Array(n + 1);

  let flag = true;

  for (let i = 0; i < m; i++) {
    const [v, u] = input[idx++].split(" ").map(Number);

    adj[v].push(u);
    adj[u].push(v);
  }

  function dfs(v) {
    for (const next of adj[v]) {
      if (group[next] === group[v]) {
        flag = false;

        return;
      } else if (group[next]) continue;

      group[next] = -group[v];
      dfs(next);
    }
  }

  for (let i = 1; i <= n; i++) {
    if (!flag) break;

    if (group[i]) continue;
    group[i] = 1;
    dfs(i);
  }

  flag ? result.push("YES") : result.push("NO");
}

console.log(result.join("\n"));
