const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 2; i < 2 + m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
  adj[u].push(v);
}

const dist = Array(n + 1).fill(-1);

let cnt = 0;

dist[1] = 0;
const queue = [1];

while (queue.length) {
  const cur = queue.shift();

  if (dist[cur] >= 2) continue; // 친구의 친구면 초대 안 함.

  for (const nxt of adj[cur]) {
    if (dist[nxt] !== -1) continue;

    queue.push(nxt);
    dist[nxt] = dist[cur] + 1;
    cnt++;
  }
}

console.log(cnt);
