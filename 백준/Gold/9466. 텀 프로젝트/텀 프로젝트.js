const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

/**
 * 보니까 서로 간선으로 이어진 정점들만 팀을 이룰 수 있는 거 같은데요..
 * 혹은 사이클로 이어져있어도 되는 거 같아요.
 *
 * 우선 방향 그래프로 만들어봅시다.
 *
 * 그리고 이게 사이클을 체크해줘야 하니까 dfs를 돌려서 adj 인접 리스트에 저장된 노드를 탐색하다가 parent으로 다시 되돌아오는 그래프면
 * 이건 사이클이 있다.. 서로 연결된 간선이 있으면 결국 되돌아오게 되어있음..
 *
 * 라고 생각하고 풀었는데 사이클이 뒤에 형성되어있을 때, 이미 방문처리가 되어있으면 사이클 확인을 못해서 finished 배열을 쓰기로..
 */

let idx = 0;

const t = Number(input[idx++]);

const result = [];
for (let i = 0; i < t; i++) {
  const n = Number(input[idx++]);
  const students = input[idx++].split(" ").map(Number);

  const adj = Array(n + 1);

  for (let j = 1; j <= n; j++) {
    adj[j] = students[j - 1];
  }

  const visited = Array(n + 1).fill(false);
  const finished = Array(n + 1).fill(false);

  let cycleCount = 0;

  function dfs(v) {
    visited[v] = true;
    const nxt = adj[v];

    if (!visited[nxt]) {
      // 아직 방문 안 했으면 dfs 다시 시도
      dfs(nxt);
    } else if (!finished[nxt]) {
      // 사이클 발견 nxt부터 현재 v까지 경로 상에 있는 노드들이 사이클임
      let cur = nxt;
      cycleCount++; // nxt 포함
      while (cur !== v) {
        cur = adj[cur];
        cycleCount++;
      }
    }
    // 모든 후손까지 전부 탐색했으면 전부 끝났다고 표시해주기
    finished[v] = true;
  }

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) dfs(i);
  }

  result.push(n - cycleCount);
}

console.log(result.join("\n"));
