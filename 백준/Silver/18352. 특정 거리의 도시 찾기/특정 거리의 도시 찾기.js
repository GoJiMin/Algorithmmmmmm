const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, k, x] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);

for (let i = 1; i <= m; i++) {
  const [v, u] = input[i].split(" ").map(Number);

  adj[v].push(u);
}

const dist = Array(n + 1).fill(-1);

const queue = [x];
dist[x] = 0;

const result = [];

while (queue.length) {
  const cur = queue.shift();

  for (const next of adj[cur]) {
    if (dist[next] !== -1) continue;

    queue.push(next);
    dist[next] = dist[cur] + 1;

    if (dist[next] === k) result.push(next);
  }
}

if (result.length) {
  console.log(result.sort((a, b) => a - b).join("\n"));
} else {
  console.log(-1);
}
