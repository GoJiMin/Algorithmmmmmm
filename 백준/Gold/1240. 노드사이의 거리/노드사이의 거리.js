const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

let idx = 0;
const [n, m] = input[idx++].split(' ').map(Number);
const adj = Array.from({length: n + 1}, () => []);

for (let i = 0; i < n - 1; i++) {
  const [u, v, w] = input[idx++].split(' ').map(Number);

  adj[u].push([v, w]);
  adj[v].push([u, w]);
}

function dfs(u, target, w, vis) {
  if (u === target) return w;
  vis[u] = true;

  for (const [nxt_v, nxt_w] of adj[u]) {
    if (!vis[nxt_v]) {
      const res = dfs(nxt_v, target, w + nxt_w, vis);

      // return w로 값이 온 경우에만 리턴 없으면 어차피 암묵적으로 undefined니까
      if (res) return res;
    }
  }
}

const result = [];
for (let i = 0; i < m; i++) {
  const [u, v] = input[idx++].split(' ').map(Number);

  const vis = Array(n + 1).fill(false);
  result.push(dfs(u, v, 0, vis));
}

console.log(result.join('\n'));
