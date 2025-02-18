const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 친구 관계를 나타낸다.. 서로 친구라면 사실상 양방향 그래프 아닌가요? 그럼 간선은 2E로 이어야겠고,
 *
 * 보면 현재 정점에서 가장 멀리 떨어진 정점 사이의 거리가 짧은 후보들을 추려야될 거 같은데요..
 *
 * 인접리스트로 전부 구해놓고, bfs로 거리를 확인하면 될 거 같은데요.
 */

const n = Number(input[0]);

const adj = Array.from({ length: n + 1 }, () => []);

let idx = 1;
while (true) {
  const [v, u] = input[idx++].split(" ").map(Number);

  if (v === -1) break;

  adj[v].push(u);
  adj[u].push(v);
}

let minDist = 52;
let candidates = [];

for (let i = 1; i <= n; i++) {
  const queue = [i];
  const dist = Array(n + 1).fill(-1);
  dist[i] = 0;

  let maxDist = -1;

  while (queue.length) {
    const cur = queue.shift();

    for (const next of adj[cur]) {
      if (dist[next] !== -1) continue;

      queue.push(next);
      dist[next] = dist[cur] + 1;

      maxDist = Math.max(maxDist, dist[next]);
    }
  }

  if (minDist > maxDist) {
    minDist = maxDist;
    candidates = [i];
  } else if (minDist === maxDist) {
    candidates.push(i);
  }
}

console.log(`${minDist} ${candidates.length}` + "\n" + candidates.join(" "));
