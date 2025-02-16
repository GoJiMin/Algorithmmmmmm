const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 모든 사람의 촌수를 구하는 문제는 아닌데요..
 *
 * 우선 v,u가 서로 부모와 자식 관계이기는 하니까 양방향 간선이니 인접 리스트를 구성할 때, adj[v], adj[u]로 처리하고..
 * v1, v2에 대한 촌수를 구하라고 했으니 v1에 대한 bfs를 돌릴까요..?
 */

const n = Number(input[0]);
const [v1, v2] = input[1].split(" ").map(Number);

const m = Number(input[2]);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 3; i < 3 + m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const dist = Array(n + 1).fill(-1);
dist[v1] = 0;

const queue = [v1];
while (queue.length) {
  const cur = queue.shift();

  if (cur === v2) break; // v2에 도착했으면 더 탐색할 필요는 없음.

  for (const nxt of adj[cur]) {
    if (dist[nxt] !== -1) continue;

    dist[nxt] = dist[cur] + 1;
    queue.push(nxt);
  }
}

console.log(dist[v2]);
