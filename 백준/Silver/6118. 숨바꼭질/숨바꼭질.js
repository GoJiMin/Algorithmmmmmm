const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 우선 양방향 길이니 간선은 정점간에 2E..
 *
 * 수혀니는 무조건 1번 헛간에서 출발.
 */

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const dist = Array(n + 1).fill(-1);

dist[1] = 0;
const queue = [1];

let mx = 0;
let minIdx = 20001;
let cnt = 0;

while (queue.length) {
  const cur = queue.shift();

  for (const next of adj[cur]) {
    if (dist[next] !== -1) continue;

    dist[next] = dist[cur] + 1;
    queue.push(next);

    if (mx < dist[next]) {
      mx = dist[next];
      minIdx = next;
      cnt = 1;
    } else if (mx === dist[next]) {
      minIdx = Math.min(next, minIdx);
      cnt++;
    }
  }
}

console.log(minIdx, mx, cnt);
