const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [n, m] = input[0].split(' ').map(Number);

const adj = Array.from({length: n}, () => []);

for (let i = 1; i <= m; i++) {
  const [u, v] = input[i].split(' ').map(Number);

  adj[u].push(v);
  adj[v].push(u);
}

const vis = Array(n).fill(false);

function dfs(depth, node) {
  if (depth === 4) {
    console.log(1);
    process.exit(0);
  }

  for (const nxt of adj[node]) {
    if (vis[nxt]) continue;

    vis[nxt] = true;
    dfs(depth + 1, nxt);
    vis[nxt] = false;
  }
}

for (let i = 0; i < n; i++) {
  vis[i] = true;
  dfs(0, i);
  vis[i] = false;
}

console.log(0);
