const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const vis = Array(n + 1).fill(false);
let cnt = 1;

const stack = [r];

while (stack.length) {
  const cur = stack.pop();

  if (vis[cur]) continue;
  vis[cur] = cnt++;

  for (const nxt of adj[cur].sort((a, b) => b - a)) {
    if (!vis[nxt]) stack.push(nxt);
  }
}

const result = [];
for (let i = 1; i <= n; i++) {
  if (vis[i]) result.push(vis[i]);
  else result.push(0);
}

console.log(result.join("\n"));
