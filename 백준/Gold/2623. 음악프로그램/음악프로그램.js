const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 위상정렬.. 하기 싫어 죽겠는데요. class 5 찍으려면 해야되니까...
 *
 * 우선 사이클이 있으면 위상정렬 못합니다. DAG만 가능함.
 */

const [n, m] = input[0].split(" ").map(Number);

const adj = Array.from({ length: n + 1 }, () => []);
const indegree = Array.from({ length: n + 1 }).fill(0);

for (let i = 1; i <= m; i++) {
  const [num, ...members] = input[i].split(" ").map(Number);

  for (let j = 1; j < num; j++) {
    adj[members[j - 1]].push(members[j]); // 방향 그래프니까 간선은 하나
    indegree[members[j]]++; // 진출차수++
  }
}

const queue = [];
for (let i = 1; i <= n; i++) {
  // 진입차수가 0인 정점은 먼저 큐에 넣어놓기
  if (indegree[i] === 0) queue.push(i);
}

const ans = [];
while (queue.length) {
  const cur = queue.shift();

  ans.push(cur);

  for (const nxt of adj[cur]) {
    // 진입차수를 하나 지워보고 0개라면 다시 큐에 넣기
    if (--indegree[nxt] === 0) queue.push(nxt);
  }
}

// 사이클이 있으면 n만큼 나오지 않음
console.log(ans.length === n ? ans.join("\n") : 0);
