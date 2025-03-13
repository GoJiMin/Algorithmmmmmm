const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const [n, m] = input[idx++].split(" ").map(Number);

// 뱀이나 사다리가 있는 칸 표시..
const adj = Array(101);

for (let i = 0; i < n + m; i++) {
  const [u, v] = input[idx++].split(" ").map(Number);

  adj[u] = v;
}

const dist = Array(101).fill(-1);

dist[1] = 0;
const queue = [1];

while (dist[100] === -1) {
  const cur = queue.shift();

  for (let i = 1; i <= 6; i++) {
    const next = cur + i;

    // 100을 넘어가면 이동 불가
    if (next > 100) continue;

    // 만약에 next 칸에 뱀이나 사다리가 있으면 이동 후에 목적지를 dest로 설정하기..
    // adj[32] = 62라면 뱀이던 사다리던 32에 도착하면 62로 이동해야함.. 없으면 그냥 32로 이동.
    const dest = adj[next] !== undefined ? adj[next] : next;

    // 방문 안 했으면
    if (dist[dest] === -1) {
      dist[dest] = dist[cur] + 1;
      queue.push(dest);
    }
  }
}

console.log(dist[100]);