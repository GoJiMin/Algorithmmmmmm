const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

function bfs(v) {
  const dist = Array(n + 1).fill(-1);
  const queue = [v];

  dist[v] = 0;

  let total = 0;

  while (queue.length) {
    const cur = queue.shift();

    for (const next of adj[cur]) {
      if (dist[next] !== -1) continue;

      dist[next] = dist[cur] + 1;
      queue.push(next);

      total += dist[next];
    }
  }

  return total;
}

const result = {
  idx: 101,
  num: Number.MAX_SAFE_INTEGER,
};

for (let i = 1; i <= n; i++) {
  const val = bfs(i);

  if (val < result.num) {
    result.idx = i;
    result.num = val;
  }
}

console.log(result.idx);
