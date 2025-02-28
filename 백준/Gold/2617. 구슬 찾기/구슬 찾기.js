const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const heavy = Array.from({ length: n + 1 }, () => []);
const light = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  heavy[v].push(u); // v번 구슬이 u번 구슬보다 무겁다.
  light[u].push(v); // u번 구슬이 v번 구슬보다 가볍다.
}

function dfs(v, adj) {
  const vis = Array(n + 1).fill(false);

  const stack = [v];
  let cnt = 0;

  while (stack.length) {
    const cur = stack.pop();
    vis[cur] = true;

    for (const next of adj[cur]) {
      if (vis[next]) continue;

      vis[next] = true;
      cnt++;
      stack.push(next);
    }
  }

  return cnt >= Math.floor((n + 1) / 2);
}

let result = 0;

for (let i = 1; i <= n; i++) {
  if (dfs(i, heavy) || dfs(i, light)) result++;
}

console.log(result);
