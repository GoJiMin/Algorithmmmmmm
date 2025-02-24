const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 진짜 드러운 문제..
 */

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[u].push(v);
}

let mx = -1;
let result = [];

function dfs(st) {
  const stack = [st];
  const vis = Array(n + 1).fill(false);

  let cnt = 0;
  vis[st] = true;

  while (stack.length) {
    const cur = stack.pop();

    for (let i = 0; i < adj[cur].length; i++) {
      if (vis[adj[cur][i]]) continue;

      cnt++;
      vis[adj[cur][i]] = true;
      stack.push(adj[cur][i]);
    }
  }

  if (cnt < mx) return;

  if (mx === cnt) {
    result.push(st);
  } else if (mx < cnt) {
    mx = cnt;
    result = [st];
  }
}

for (let i = 1; i <= n; i++) dfs(i);

console.log(result.join(" "));
