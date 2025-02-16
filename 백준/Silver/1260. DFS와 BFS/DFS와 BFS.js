const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, v] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const bfsVis = Array(n + 1).fill(false);
const dfsVis = Array(n + 1).fill(false);

const bfsResult = [];
const dfsResult = [];

function bfs(v) {
  bfsResult.push(v);
  bfsVis[v] = true;

  const queue = [v];

  while (queue.length) {
    const cur = queue.shift();

    for (const nxt of adj[cur]) {
      if (bfsVis[nxt]) continue;

      bfsResult.push(nxt);
      queue.push(nxt);
      bfsVis[nxt] = true;
    }
  }
}

function dfs(v) {
  dfsVis[v] = true;
  dfsResult.push(v);

  for (const nxt of adj[v]) {
    if (dfsVis[nxt]) continue;
    dfs(nxt);
  }
}

// 작은 정점부터 돌리려면 sort..
for (const list of adj) {
  list.sort((a, b) => a - b);
}

bfs(v);
dfs(v);

console.log(dfsResult.join(" ") + "\n" + bfsResult.join(" "));
