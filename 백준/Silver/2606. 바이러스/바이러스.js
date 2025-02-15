const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 [2, 5], 
 [1, 3, 5], 
 [2], 
 [7], 
 [1, 2, 6], 
 [5], 
 [4]
 * idx 1부터 7까지 이어진 정점들..
 *
 * 
   */

const v_n = Number(input[0]);
const t_n = Number(input[1]);

const adj = Array.from({ length: v_n + 1 }, () => []);
const vis = Array(v_n + 1).fill(false);

for (let i = 2; i <= t_n + 1; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const queue = [];

queue.push(1);
vis[1] = true;

let cnt = 0;
while (queue.length) {
  const cur = queue.shift();

  for (const nxt of adj[cur]) {
    if (vis[nxt]) continue;
    queue.push(nxt);
    vis[nxt] = true;
    cnt++;
  }
}

console.log(cnt);