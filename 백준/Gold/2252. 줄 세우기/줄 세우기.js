const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);
const inDegree = Array(n + 1).fill(0);

for (let i = 1; i <= m; i++) {
  const [u, v] = input[i].split(" ").map(Number);

  adj[u].push(v);
  inDegree[v]++;
}

const queue = [];

for (let i = 1; i <= n; i++) {
  if (inDegree[i] === 0) queue.push(i);
}

const result = [];

while (queue.length) {
  const cur = queue.shift();

  result.push(cur);

  for (const nxt of adj[cur]) {
    if (--inDegree[nxt] === 0) queue.push(nxt);
  }
}

console.log(result.join(" "));
