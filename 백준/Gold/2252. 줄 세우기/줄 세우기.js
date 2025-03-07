const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [u, v] = input[i].split(" ").map(Number);

  adj[u].push(v);
}

const vis = Array(n + 1).fill(false);

const result = [];

function dfs(v) {
  vis[v] = true;
  for (const nxt of adj[v]) {
    if (!vis[nxt]) dfs(nxt);
  }

  result.push(v);
}

for (let i = 1; i <= n; i++) {
  if (!vis[i]) dfs(i);
}

console.log(result.reverse().join(" "));

console.log(adj);
